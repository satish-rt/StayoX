const Listing = require("./models/listing.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
  // Defensive: passport provides req.isAuthenticated(); if missing, treat as not logged in
  const isAuth =
    typeof req.isAuthenticated === "function" ? req.isAuthenticated() : false;
  if (!isAuth) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create listings!");
    return res.redirect("/listings");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to edit this listing!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not a athour of this Review!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
