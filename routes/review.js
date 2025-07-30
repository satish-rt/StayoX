const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require("../models/listing.js");
const ExpressError = require('../utils/ExpressError.js');
const Review = require('../models/review');
const { validateReview, isLoggedIn,isReviewAuthor } = require("../middleware.js");
const ReviewController = require("../controllers/reviews.js");


//Post Poute
router.post('/',isLoggedIn,validateReview,wrapAsync(ReviewController.createReview));

//DELETE Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(ReviewController.destroyReview));

module.exports = router;