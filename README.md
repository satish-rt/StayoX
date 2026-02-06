# StayoX - Vacation Rental Booking Platform

A full-stack Node.js/Express vacation rental booking platform with MongoDB, featuring property listings, user authentication, booking management, and payment integration with Razorpay.

> **📚 Documentation:**
>
> - [🚀 DEPLOYMENT GUIDE](DEPLOYMENT.md) - Deploy to FREE hosting (Replit/Railway)
> - [✅ FORMS TESTING](FORMS_TESTING.md) - All 14 forms verified working
> - [🤖 AI CODING GUIDE](.github/copilot-instructions.md) - For AI-assisted development

## 🎯 Features

- **User Authentication**: Dual-role authentication (Property Owners & Renters) using Passport.js
- **Property Listings**: Create, edit, delete listings with image uploads via Cloudinary
- **Advanced Search**: Search listings by title, location, country, and description
- **Booking System**: Complete booking flow with date validation and availability checking
- **Payment Integration**: Razorpay payment gateway with order creation and verification
- **Reviews & Ratings**: Users can leave reviews on listings
- **User Profiles**: User account management with profile customization
- **Responsive Design**: Mobile-friendly interface with EJS templating
- **Map Integration**: Google Maps API for property location visualization
- **Session Management**: Secure session handling with MongoDB/Express Session

## 🛠️ Tech Stack

**Backend:**

- Node.js (v22.14.0)
- Express.js 5.x
- MongoDB & Mongoose
- Passport.js (Authentication)
- Express-session
- Multer (File upload)

**Frontend:**

- EJS Templating
- Bootstrap/CSS
- Google Maps API
- JavaScript (Client-side)

**External Services:**

- Cloudinary (Image storage)
- Razorpay (Payment gateway)
- MongoDB Atlas (Database)

## 📋 Prerequisites

- Node.js v22.14.0+
- npm or yarn
- MongoDB Atlas account (free tier available)
- Cloudinary account (free tier available)
- Razorpay account (free tier available)
- Google Maps API key

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/satish-rt/StayoX.git
cd StayoX
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
ATLAS_DB=mongodb+srv://username:password@cluster.mongodb.net/stayox

# Session
SECRET=your-secret-key-here
NODE_ENV=development

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Cloudinary (Image Storage)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

### 4. Run the Application

**Development:**

```bash
node app.js
```

The app will start on `http://localhost:3000`

## 📁 Project Structure

```
├── app.js                      # Main Express app
├── middleware.js               # Custom middleware (auth, validation)
├── schema.js                   # Joi validation schemas
├── cloudConfig.js              # Cloudinary configuration
├── controllers/                # Business logic
│   ├── listings.js
│   ├── bookings.js
│   ├── reviews.js
│   └── users.js
├── models/                     # MongoDB schemas
│   ├── listing.js
│   ├── booking.js
│   ├── review.js
│   └── user.js
├── routes/                     # Express routes
│   ├── listing.js
│   ├── booking.js
│   ├── review.js
│   └── user.js
├── views/                      # EJS templates
│   ├── layouts/
│   ├── includes/
│   ├── listings/
│   ├── bookings/
│   └── users/
├── public/                     # Static assets
│   ├── css/
│   └── js/
└── utils/                      # Helper utilities
    ├── ExpressError.js
    └── wrapAsync.js
```

## 🔑 Key Features & Usage

### Listing Management

- **Create Listing**: Owners can create new property listings with images and details
- **Edit/Delete**: Modify or remove your listings
- **Search**: Find properties by location, title, country, or description

### Booking System

- **Create Booking**: Select dates, number of guests
- **Pricing**: Automatic calculation with 18% GST + 5% platform fee
- **Payment**: Secure payment via Razorpay
- **Cancellation**: Cancel completed bookings within 24 hours for refund

### User Roles

- **Owners**: Create and manage property listings
- **Renters**: Book properties and manage bookings

## 🔒 Authentication & Authorization

- Passport.js LocalStrategy for user authentication
- Role-based access control (Owner/Renter)
- Secure session management
- Flash messages for user feedback

## 💳 Payment Flow

1. User creates booking with check-in/check-out dates
2. System calculates total price with taxes and fees
3. User proceeds to payment page
4. Razorpay checkout for secure payment
5. Payment verification and booking confirmation
6. User can view booking details in profile

## 🗄️ Database Models

### User

- Username, email, password (hashed)
- First name, last name, phone number
- Role (owner/renter)
- Profile image and emoji

### Listing

- Title, description, location, country
- Price, property type, amenities
- Bedrooms, bathrooms, max guests
- Owner reference, reviews array
- Coordinates (latitude/longitude)
- Image (URL + filename for Cloudinary)

### Booking

- Listing reference, user reference
- Check-in/check-out dates
- Number of nights, guest count
- Total price, payment status
- Payment ID (Razorpay)

### Review

- Author reference
- Rating, comment
- Listing reference

## 🚢 Deployment

### Free Deployment Options

#### Render.com (Recommended)

1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Set Build Command: `npm install`
4. Set Start Command: `node app.js`
5. Add environment variables
6. Deploy

#### Railway.app

1. Go to [railway.app](https://railway.app)
2. Import GitHub repository
3. Add environment variables
4. Auto-deploys on push

#### Vercel / Fly.io

- Similar process with GitHub integration

## 📦 Dependencies

See `package.json` for complete list:

- express - Web framework
- mongoose - MongoDB ODM
- passport - Authentication
- cloudinary - Image storage
- razorpay - Payment gateway
- ejs - Templating engine
- multer - File upload handling
- connect-flash - Flash messages
- express-session - Session management
- dotenv - Environment variables

## 🛠️ Development Tips

- **Debugging**: Use `DEBUG=mongoose:* node app.js` for MongoDB query logs
- **Error Handling**: All async route handlers wrapped with `wrapAsync()` utility
- **Validation**: Joi schemas in `schema.js` for input validation
- **Flash Messages**: Success/error messages stored in `req.flash()`
- **Authorization**: Middleware functions `isLoggedIn()`, `isOwner()`, `isReviewAuthor()`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

- GitHub: [@satish-rt](https://github.com/satish-rt)

## 🆘 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Live Demo**: Coming soon...

**Happy Booking! 🎉**
