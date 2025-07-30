if(process.env.NODE_ENV !="production"){
require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStratergy = require("passport-local");
const user = require("./models/user.js");


app.set('view engine' , 'ejs');
app.set('views',path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.engine('ejs' , engine);
app.use(express.static(path.join(__dirname, "public")));

const dbUrl =process.env.ATLAS_DB;

// Root route
app.get('/', (req, res) => {
  res.send("Hi! I am the root route");
});

const store = MongoStore.create({ 
  mongoUrl: dbUrl,
  crypto : {
    secret : process.env.SECRET,
  },
  touchAfter : 24 * 3600,
});

store.on("error" , (err)=>{
  console.log("ERROR in MONGO SESSION STORE", err);
})


const sessionOpations = {
  store,
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : true,
  cookie : {
    expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge  : 1000 * 60 * 60 * 24 * 7,
    httpOnly : true
  },
};


app.use(session(sessionOpations));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const UserRoutes = require("./routes/user.js");


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


app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/",UserRoutes);


app.use((req, res, next) => {
  next(new ExpressError(404, 'Page Not Found!'));
});


app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error", { message, status: statusCode });
});


// Start the server
app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
