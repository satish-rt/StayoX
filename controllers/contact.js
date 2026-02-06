const Contact = require("../models/contact");
const ExpressError = require("../utils/ExpressError");

module.exports.renderContactForm = (req, res) => {
  res.render("contact.ejs");
};

module.exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      req.flash("error", "Please fill in all required fields");
      return res.redirect("/contact");
    }

    // Create new contact query
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      phone: phone || "",
      userType: req.user ? req.user.role || "general" : "general",
      status: "new",
    });

    // Save to database
    await newContact.save();

    req.flash(
      "success",
      "Thank you for your message! We'll respond within 24 hours.",
    );
    res.redirect("/contact");
  } catch (err) {
    console.error("Contact form error:", err);
    req.flash("error", "Error submitting your message. Please try again.");
    res.redirect("/contact");
  }
};

module.exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.render("admin/contacts.ejs", { contacts });
  } catch (err) {
    req.flash("error", "Error fetching contacts");
    res.redirect("/");
  }
};

module.exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndUpdate(id, { status: "read" });
    req.flash("success", "Marked as read");
    res.redirect("/admin/contacts");
  } catch (err) {
    req.flash("error", "Error updating contact");
    res.redirect("/admin/contacts");
  }
};

module.exports.sendResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    if (!response) {
      req.flash("error", "Please provide a response");
      return res.redirect("/admin/contacts");
    }

    await Contact.findByIdAndUpdate(id, {
      status: "responded",
      response,
      respondedAt: new Date(),
    });

    req.flash("success", "Response sent successfully");
    res.redirect("/admin/contacts");
  } catch (err) {
    req.flash("error", "Error sending response");
    res.redirect("/admin/contacts");
  }
};
