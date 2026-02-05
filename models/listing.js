const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  listingType: {
    type: String,
    enum: ["For Rent", "For Sale"],
    default: "For Rent"
  },
  location: String,
  country: String,
  // Added coordinates for Maps integration
  latitude: { type: Number },
  longitude: { type: Number },
  bedrooms: {
    type: Number,
    default: 1
  },
  beds: {
    type: Number,
    default: 1
  },
  bathrooms: {
    type: Number,
    default: 1
  },
  propertyType: {
    type: String,
    enum: ["Apartment", "House", "Villa", "Cabin", "Condo", "Other"],
    default: "Apartment"
  },
  amenities: {
    type: [String],
    default: []
  },
  maxGuests: {
    type: Number,
    default: 2
  },
  squareFeet: {
    type: Number
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
