const Joi = require('joi');
const Listing = require('./models/listing');
const Review = require('./models/review');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        listingType : Joi.string().valid("For Rent", "For Sale").required(),
        image : Joi.string().allow("",null),
        // Coordinates for map support - allow empty or null for optional fields
        latitude: Joi.number().min(-90).max(90).allow('', null).optional(),
        longitude: Joi.number().min(-180).max(180).allow('', null).optional(),
        // Property details - allow empty or null for optional fields
        bedrooms: Joi.number().min(0).allow('', null).optional(),
        beds: Joi.number().min(1).allow('', null).optional(),
        bathrooms: Joi.number().min(0).allow('', null).optional(),
        propertyType: Joi.string().valid("Apartment","House","Villa","Cabin","Condo","Other").allow('', null).optional(),
        // Amenities can come as a single string or array of strings
        amenities: Joi.alternatives().try(
            Joi.array().items(Joi.string()),
            Joi.string()
        ).allow('', null).optional(),
        maxGuests: Joi.number().min(1).allow('', null).optional(),
        squareFeet: Joi.number().min(0).allow('', null).optional()
        }).required(),
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
});