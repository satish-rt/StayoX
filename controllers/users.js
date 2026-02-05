const User = require("../models/user.js");
const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password, firstName, lastName, phoneNumber, role } =
      req.body;
    const newUser = new User({
      username,
      email,
      firstName,
      lastName,
      phoneNumber,
      role: role || "owner", // Default to owner for the original signup form
    });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to StayoX!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back to StayoX!");
  res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged you out!");
    res.redirect("/listings");
  });
};

// Renter-specific controller functions
module.exports.renderRenterSignupForm = (req, res) => {
  res.render("users/renter-signup.ejs");
};

module.exports.renderRenterLoginForm = (req, res) => {
  res.render("users/renter-login.ejs");
};

module.exports.renterLogin = (req, res) => {
  req.flash("success", "Welcome back to StayoX!");
  res.redirect(res.locals.redirectUrl || "/listings");
};

// Renter profile and account pages
module.exports.renderRenterProfile = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user._id);
    const bookings = await Booking.find({ user: req.user._id })
      .populate("listing")
      .sort({ createdAt: -1 });

    res.render("users/renter-profile.ejs", { userDetails, bookings });
  } catch (e) {
    req.flash("error", "Something went wrong");
    res.redirect("/listings");
  }
};

module.exports.renderRenterAccount = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user._id);
    res.render("users/renter-account.ejs", { userDetails });
  } catch (e) {
    req.flash("error", "Something went wrong");
    res.redirect("/listings");
  }
};

module.exports.updateRenterAccount = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, bio, address, city, country } =
      req.body;
    await User.findByIdAndUpdate(req.user._id, {
      firstName,
      lastName,
      phoneNumber,
      bio,
      address,
      city,
      country,
    });

    req.flash("success", "Account updated successfully");
    res.redirect("/renter/account");
  } catch (e) {
    req.flash("error", "Failed to update account");
    res.redirect("/renter/account");
  }
};

module.exports.updateRenterProfileImage = async (req, res) => {
  try {
    // Handle profile image upload
    // This would use cloudinary or similar service
    const profileImage = req.file ? req.file.path : null;

    if (profileImage) {
      await User.findByIdAndUpdate(req.user._id, { profileImage });
      req.flash("success", "Profile image updated");
    } else {
      req.flash("error", "No image uploaded");
    }

    res.redirect("/renter/profile");
  } catch (e) {
    req.flash("error", "Failed to update profile image");
    res.redirect("/renter/profile");
  }
};

module.exports.renderAccountPage = async (req, res) => {
  const userId = req.user._id;
  const userDetails = await User.findById(userId);
  res.render("users/account.ejs", { userDetails });
};

module.exports.updateAccount = async (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, phoneNumber, address, city, country, bio } =
    req.body;

  await User.findByIdAndUpdate(userId, {
    firstName,
    lastName,
    phoneNumber,
    address,
    city,
    country,
    bio,
  });

  req.flash("success", "Account details updated successfully!");
  res.redirect("/account");
};

module.exports.updateProfileImage = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check if file was uploaded
    if (!req.file) {
      console.log("No file uploaded - req.file is undefined");
      req.flash("error", "Please select an image to upload");
      return res.redirect("/account");
    }

    console.log("File uploaded successfully:", req.file);

    // Update user profile with new image URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profileImage: req.file.path,
      },
      { new: true },
    );

    console.log(
      "User updated with new profile image:",
      updatedUser.profileImage,
    );

    req.flash("success", "Profile picture updated successfully!");
    res.redirect("/account");
  } catch (err) {
    console.error("Error updating profile image:", err);
    req.flash("error", "Failed to update profile picture: " + err.message);
    res.redirect("/account");
  }
};

module.exports.updateProfileEmoji = async (req, res) => {
  try {
    const userId = req.user._id;
    const { profileEmoji } = req.body;

    console.log("Received emoji:", profileEmoji, "User ID:", userId);

    // Validate emoji was provided
    if (!profileEmoji || !profileEmoji.toString().trim()) {
      req.flash("error", "Please select an emoji");
      return res.redirect("/account");
    }

    // Update user profile with selected emoji
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profileEmoji: profileEmoji,
      },
      { new: true },
    );

    console.log("Updated user emoji:", updatedUser.profileEmoji);

    req.flash("success", "Profile emoji updated successfully!");
    res.redirect("/account");
  } catch (err) {
    console.error("Error updating profile emoji:", err);
    req.flash("error", "Failed to update profile emoji: " + err.message);
    res.redirect("/account");
  }
};

module.exports.renderUserAboutPage = async (req, res) => {
  try {
    const { id } = req.params;
    const userProfile = await User.findById(id);

    if (!userProfile) {
      req.flash("error", "User not found!");
      return res.redirect("/listings");
    }

    const listings = await Listing.find({ owner: id });

    res.render("users/about.ejs", { userProfile, listings });
  } catch (err) {
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};

module.exports.renderUserListings = async (req, res) => {
  try {
    // Get id from regex capture group [0] if using regex route, otherwise from :id param
    const id = req.params[0] || req.params.id;
    const listings = await Listing.find({ owner: id })
      .populate("owner")
      .sort({ createdAt: -1 });
    // Reuse listings index view - pass as allListing for compatibility
    res.render("listings/index.ejs", {
      allListing: listings,
      searchParams: {},
    });
  } catch (err) {
    console.error("renderUserListings error:", err);
    req.flash("error", "Failed to load user listings");
    return res.redirect("/listings");
  }
};

// Renter-specific routes
module.exports.renderRenterSignupForm = (req, res) => {
  res.render("users/renter-signup.ejs");
};

module.exports.renderRenterLoginForm = (req, res) => {
  res.render("users/renter-login.ejs");
};

module.exports.renterLogin = (req, res) => {
  req.flash("success", "Welcome back to StayoX!");
  res.redirect(res.locals.redirectUrl || "/listings");
};
