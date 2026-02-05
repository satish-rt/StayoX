const Listing = require("../models/listing.js")

module.exports.index = async(req,res) => {
  const { search } = req.query;
  let filter = {};
  
  if (search && search.trim()) {
    // Search across title, location, country, and description
    filter = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    };
  }
  
  const allListing = await Listing.find(filter);
  const searchParams = { search: search || '' };
  res.render("listings/index.ejs" , { allListing, searchParams });
};

module.exports.RenderNewForm = (req,res) => {
  res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author'
      }
    })
    .populate('owner');

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
}


module.exports.createListing = async(req, res,next) => {
       try {
           console.log("=== CREATE LISTING DEBUG ===");
           console.log("req.body:", req.body);
           console.log("req.file:", req.file);
           console.log("req.user:", req.user);
           
           // Check if file was uploaded
           if (!req.file) {
               console.log("ERROR: No file uploaded");
               req.flash("error", "Please upload a property image! Accepted formats: JPG, PNG, WebP");
               return res.redirect("/listings/new");
           }
           
           // Validate file was successfully uploaded to Cloudinary
           if (!req.file.path || !req.file.filename) {
               console.log("ERROR: File upload to Cloudinary failed - missing path or filename");
               req.flash("error", "Image upload failed. Please try again with a different image.");
               return res.redirect("/listings/new");
           }
           
           let url = req.file.path;
           let filename = req.file.filename;
           console.log("File received - URL:", url, "Filename:", filename);
           
           // Validate price is present and is a number
           if (!req.body.listing.price) {
               req.flash("error", "Price is required!");
               return res.redirect("/listings/new");
           }
           
           // Create new listing with all form data
           let newListing = new Listing(req.body.listing);
           newListing.owner = req.user._id;
           newListing.image = {url, filename};
           
           // Handle amenities field (convert to array if it's a single value)
           if (req.body.listing.amenities) {
               if (Array.isArray(req.body.listing.amenities)) {
                   newListing.amenities = req.body.listing.amenities;
               } else {
                   newListing.amenities = [req.body.listing.amenities];
               }
           } else {
               newListing.amenities = [];
           }
           
           // Ensure all numeric fields are properly converted
           if (req.body.listing.latitude) {
               newListing.latitude = parseFloat(req.body.listing.latitude);
           }
           if (req.body.listing.longitude) {
               newListing.longitude = parseFloat(req.body.listing.longitude);
           }
           if (req.body.listing.bedrooms) {
               newListing.bedrooms = parseInt(req.body.listing.bedrooms);
           }
           if (req.body.listing.beds) {
               newListing.beds = parseInt(req.body.listing.beds);
           }
           if (req.body.listing.bathrooms) {
               newListing.bathrooms = parseFloat(req.body.listing.bathrooms);
           }
           if (req.body.listing.maxGuests) {
               newListing.maxGuests = parseInt(req.body.listing.maxGuests);
           }
           if (req.body.listing.squareFeet) {
               newListing.squareFeet = parseInt(req.body.listing.squareFeet);
           }
           
           // Convert price to number
           newListing.price = parseFloat(req.body.listing.price);
           
           console.log("New listing object before save:", newListing);
           const savedListing = await newListing.save();
           console.log("Listing saved successfully with ID:", savedListing._id);
           req.flash("success", "New Listing Created!");
           res.redirect("/listings");
       } catch (error) {
           console.error("=== ERROR IN CREATE LISTING ===");
           console.error("Error Type:", error.constructor.name);
           console.error("Error Message:", error.message);
           console.error("Error Stack:", error.stack);
           req.flash("error", "Error creating listing: " + error.message);
           res.redirect("/listings/new");
       } 
}

module.exports.editListing = async (req,res) => {
  let {id} = req.params;
  let listing = await Listing.findById(id);
   if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings"); 
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", {listing , originalImageUrl});
}

module.exports.updateListing = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true, runValidators: true });
if(typeof req.file !== "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = {url , filename};
  await listing.save();
}
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings"); 
  }
  
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req,res) => {
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect('/listings');
}