if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "public")));

const dbUrl = process.env.ATLAS_DB;

// const store = MongoStore.create({
//   mongoUrl: dbUrl,
//   crypto : {
//     secret : process.env.SECRET,
//   },
//   touchAfter : 24 * 3600,
// });

// store.on("error" , (err)=>{
//   console.log("ERROR in MONGO SESSION STORE", err);
// })

const sessionOpations = {
  //store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.use(session(sessionOpations));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  res.locals.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY || "";
  next();
});

const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const UserRoutes = require("./routes/user.js");
const bookingRoutes = require("./routes/booking.js");

// Register routes
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
// Default root route - render landing page with login option
app.get("/", async (req, res) => {
  try {
    const Listing = require("./models/listing.js");
    const allListing = await Listing.find().limit(6);
    res.render("new_home", { allListing });
  } catch (err) {
    res.render("new_home", { allListing: [] });
  }
});
app.use("/", UserRoutes);
app.use("/", bookingRoutes);

// MongoDB connection
async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

// About and Contact page routes
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Support pages routes
app.get("/faq", (req, res) => {
  res.render("faq");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.get("/privacy", (req, res) => {
  res.render("privacy");
});

app.get("/help-center", (req, res) => {
  res.render("help-center");
});

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error", { message, status: statusCode });
});

// Start the server
app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
