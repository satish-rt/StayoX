const Booking = require("../models/booking");
const Listing = require("../models/listing");
const User = require("../models/user");
const Razorpay = require("razorpay");
const ExpressError = require("../utils/ExpressError");

// Razorpay setup
const hasRazorpay =
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;

const razorpay = hasRazorpay
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

/* --------------------------------------------------
   Helpers
-------------------------------------------------- */

const calculateBookingPrice = (basePrice, nights, guests = 1) => {
  const nightlyPrice = basePrice * nights;
  const tax = nightlyPrice * 0.18;
  const platformFee = nightlyPrice * 0.05;
  const totalPrice = nightlyPrice + tax + platformFee;

  return {
    nightlyRate: basePrice,
    nightlyPrice,
    numberOfNights: nights,
    tax: Math.round(tax * 100) / 100,
    platformFee: Math.round(platformFee * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100,
  };
};

const validateBookingDates = (checkIn, checkOut) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkInDate < today)
    throw new ExpressError(400, "Check-in date cannot be in the past");

  if (checkOutDate <= checkInDate)
    throw new ExpressError(400, "Check-out must be after check-in");

  return { checkInDate, checkOutDate };
};

const checkDateAvailability = async (listingId, checkIn, checkOut) => {
  const conflicts = await Booking.find({
    listing: listingId,
    paymentStatus: { $in: ["completed", "pending"] },
    checkIn: { $lt: checkOut },
    checkOut: { $gt: checkIn },
  });
  return conflicts.length === 0;
};

/* --------------------------------------------------
   Booking Flow
-------------------------------------------------- */

module.exports.renderBookingForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  res.render("bookings/new.ejs", { listing });
};

module.exports.createBookingForListing = async (req, res) => {
  req.params.id = req.params.listingId;
  return module.exports.createBooking(req, res);
};

module.exports.createBooking = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }

  const { checkIn, checkOut, guests } = req.body.booking || req.body;
  const { checkInDate, checkOutDate } = validateBookingDates(checkIn, checkOut);

  const available = await checkDateAvailability(
    listing._id,
    checkInDate,
    checkOutDate,
  );

  if (!available) {
    return res.status(400).json({ error: "Dates not available" });
  }

  const guestCount = parseInt(guests) || 1;
  const nights = Math.ceil(
    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
  );

  const pricing = calculateBookingPrice(listing.price, nights, guestCount);

  const booking = new Booking({
    listing: listing._id,
    user: req.user._id,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: guestCount,
    numberOfNights: nights,
    totalPrice: pricing.totalPrice,
    paymentStatus: "pending",
  });

  await booking.save();

  res.json({
    success: true,
    bookingId: booking._id,
    redirectUrl: `/bookings/${booking._id}/payment`,
  });
};

/* --------------------------------------------------
   Payment
-------------------------------------------------- */

module.exports.renderPaymentPage = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("listing")
    .populate("user");

  if (!booking) {
    req.flash("error", "Booking not found");
    return res.redirect("/listings");
  }

  const pricing = calculateBookingPrice(
    booking.listing.price,
    booking.numberOfNights,
    booking.guests,
  );

  res.render("bookings/payment.ejs", {
    booking,
    pricing,
    gatewayKeyId: process.env.RAZORPAY_KEY_ID || null,
  });
};

module.exports.createOrder = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("listing");
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  if (!hasRazorpay)
    return res.status(400).json({ error: "Razorpay not configured" });

  const amount = Math.round(booking.totalPrice * 100);

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `booking_${booking._id}`,
  });

  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  });
};

module.exports.paymentSuccess = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) return res.status(404).json({ error: "Booking not found" });

  booking.paymentStatus = "completed";
  booking.paymentId = req.body.payment_id || `pay_${Date.now()}`;
  await booking.save();

  res.json({ success: true });
};

// --------------------------------------------------
// UPI / QR / App payment handlers (simple server-side
// simulation / acceptance). These allow the UI to call
// /process-upi, /process-upi-app and /process-qr and
// mark the booking as completed. The real gateway
// integrations can be added later when API keys are
// available in .env.
// --------------------------------------------------

module.exports.processUPI = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("listing");
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  if (booking.user.toString() !== req.user._id.toString())
    return res.status(403).json({ error: "Unauthorized" });

  const { upiId, name, email, amount } = req.body;
  // Basic amount check (allow small rounding differences)
  if (amount && Math.abs(Number(amount) - booking.totalPrice) > 1) {
    return res.status(400).json({ error: "Amount mismatch" });
  }

  booking.paymentStatus = "completed";
  booking.paymentMethod = "upi";
  booking.paymentDetails = { upiId, payerName: name, payerEmail: email };
  booking.paymentId = `upi_${Date.now()}`;
  await booking.save();

  res.json({ success: true });
};

module.exports.processUPIApp = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("listing");
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    // Ensure req.user exists (defensive) before accessing properties
    if (!req.user)
      return res.status(401).json({ error: "Authentication required" });

    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });

    const { upiApp, name, email, amount } = req.body || {};
    if (amount && Math.abs(Number(amount) - booking.totalPrice) > 1) {
      return res.status(400).json({ error: "Amount mismatch" });
    }

    booking.paymentStatus = "completed";
    booking.paymentMethod = "upi";
    booking.paymentDetails = { upiApp, payerName: name, payerEmail: email };
    booking.paymentId = `upiapp_${Date.now()}`;
    await booking.save();

    res.json({ success: true });
  } catch (err) {
    // Log full error to server console for debugging and return JSON error
    console.error("processUPIApp error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

module.exports.processQR = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("listing");
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  if (booking.user.toString() !== req.user._id.toString())
    return res.status(403).json({ error: "Unauthorized" });

  const { name, email, amount } = req.body;
  if (amount && Math.abs(Number(amount) - booking.totalPrice) > 1) {
    return res.status(400).json({ error: "Amount mismatch" });
  }

  booking.paymentStatus = "completed";
  booking.paymentMethod = "upi";
  booking.paymentDetails = { payerName: name, payerEmail: email };
  booking.paymentId = `qr_${Date.now()}`;
  await booking.save();

  res.json({ success: true });
};

/* --------------------------------------------------
   Confirmation & Listings
-------------------------------------------------- */

module.exports.renderConfirmation = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("listing");
  if (!booking) {
    req.flash("error", "Booking not found");
    return res.redirect("/listings");
  }

  // Compute pricing breakdown for display (same logic as payment page)
  const pricing = calculateBookingPrice(
    booking.listing.price,
    booking.numberOfNights,
    booking.guests,
  );

  res.render("bookings/confirmation.ejs", { booking, pricing });
};

module.exports.showUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing")
    .sort({ createdAt: -1 });

  res.render("bookings/index.ejs", { bookings });
};

/* --------------------------------------------------
   ✅ FIXED: Cancel Booking (JSON + Redirect safe)
-------------------------------------------------- */

module.exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    if (req.headers.accept?.includes("application/json")) {
      return res.status(404).json({ error: "Booking not found" });
    }
    req.flash("error", "Booking not found");
    return res.redirect("/bookings");
  }

  if (booking.user.toString() !== req.user._id.toString()) {
    if (req.headers.accept?.includes("application/json")) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    req.flash("error", "Unauthorized");
    return res.redirect("/bookings");
  }

  if (booking.paymentStatus === "completed") {
    booking.paymentStatus = "refunded";
    await booking.save();

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ success: true, status: "refunded" });
    }

    req.flash("success", "Booking cancelled & refund initiated");
  } else {
    await Booking.findByIdAndDelete(req.params.id);

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ success: true, status: "deleted" });
    }

    req.flash("success", "Booking cancelled");
  }

  res.redirect("/bookings");
};
