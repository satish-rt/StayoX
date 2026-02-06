const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userController = require("../controllers/users.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login,
  );

// Renter-specific routes
router
  .route("/renter-signup")
  .get(userController.renderRenterSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/renter-login")
  .get(userController.renderRenterLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/renter-login",
      failureFlash: true,
    }),
    userController.renterLogin,
  );

// Account routes
router
  .route("/account")
  .get(isLoggedIn, wrapAsync(userController.renderAccountPage))
  .post(isLoggedIn, wrapAsync(userController.updateAccount));

// Profile image upload route
router.post(
  "/account/profile-image",
  isLoggedIn,
  upload.single("profileImage"),
  wrapAsync(userController.updateProfileImage),
);

// Profile emoji update route
router.post(
  "/account/profile-emoji",
  isLoggedIn,
  wrapAsync(userController.updateProfileEmoji),
);

// About page route
router.get("/about", (req, res) => {
  res.render("about.ejs");
});

// User listings (My Listings)
router.get(
  "/users/:userId/listings",
  wrapAsync(userController.renderUserListings),
);

// User about page route
router.get("/users/:id", wrapAsync(userController.renderUserAboutPage));

// GET: Logout user
router.get("/logout", userController.logOut);

// Contact form routes
const contactController = require("../controllers/contact.js");

router
  .route("/contact")
  .get(contactController.renderContactForm)
  .post(wrapAsync(contactController.submitContactForm));

module.exports = router;
