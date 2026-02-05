const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    profileImage: {
        type: String,
        default: "https://res.cloudinary.com/dxagsphno/image/upload/v1651456977/default-profile_xqcbkl.png"
    },
    profileEmoji: {
        type: String,
        default: "👤"
    },
    bio: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["owner", "renter"],
        default: "owner"
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
