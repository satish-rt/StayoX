const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  userType: {
    type: String,
    enum: ["guest", "owner", "general"],
    default: "general",
  },
  status: {
    type: String,
    enum: ["new", "read", "responded"],
    default: "new",
  },
  response: {
    type: String,
    default: null,
  },
  respondedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt on every save
contactSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
