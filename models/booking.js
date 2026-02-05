const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    numberOfNights: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending"
    },
    paymentId: {
        type: String
    },
    paymentMethod: {
        type: String,
        enum: ["razorpay", "upi"],
        default: "razorpay"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;