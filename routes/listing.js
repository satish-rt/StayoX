const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require("../models/listing.js");
const { listingSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingsController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router.route('/')
.get(wrapAsync(listingsController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingsController.createListing))

//New  Route
router.get('/new', isLoggedIn , listingsController.RenderNewForm );

router.route("/:id")
.get(wrapAsync(listingsController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingsController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingsController.destroyListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingsController.editListing));

module.exports = router;