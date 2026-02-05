const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookings");
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

// Show all user bookings (must come before /bookings/:id routes)
router.get("/bookings", isLoggedIn, wrapAsync(bookingController.showUserBookings));

// Create new booking routes (listing-specific routes)
router.get("/listings/:id/book", isLoggedIn, wrapAsync(bookingController.renderBookingForm));
router.post("/listings/:id/book", isLoggedIn, wrapAsync(bookingController.createBooking));

// Alternative route for frontend compatibility (creates booking for listing)
// This must come before the specific booking routes to avoid conflicts
router.post("/bookings/create/:listingId", isLoggedIn, wrapAsync(bookingController.createBookingForListing));

// Payment routes (more specific paths come first)
router.post("/bookings/:id/create-order", isLoggedIn, wrapAsync(bookingController.createOrder));
router.post("/bookings/:id/process-upi", isLoggedIn, wrapAsync(bookingController.processUPI));
router.post("/bookings/:id/process-upi-app", isLoggedIn, wrapAsync(bookingController.processUPIApp));
router.post("/bookings/:id/process-qr", isLoggedIn, wrapAsync(bookingController.processQR));
router.post("/bookings/:id/payment-success", isLoggedIn, wrapAsync(bookingController.paymentSuccess));
router.get("/bookings/:id/payment", isLoggedIn, wrapAsync(bookingController.renderPaymentPage));

// Booking confirmation
router.get("/bookings/:id/confirmation", isLoggedIn, wrapAsync(bookingController.renderConfirmation));

// Cancel booking (must come last to avoid conflicts)
router.delete("/bookings/:id", isLoggedIn, wrapAsync(bookingController.cancelBooking));

module.exports = router;
