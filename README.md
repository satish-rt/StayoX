# StayoX - Vacation Rental Booking Platform

A full-stack Node.js/Express vacation rental booking platform with MongoDB, featuring property listings, user authentication, booking management, interactive maps, and payment integration with Razorpay.

## 🎯 Features

- **User Authentication**: Dual-role authentication (Property Owners & Renters) using Passport.js
- **Property Listings**: Create, edit, delete listings with image uploads via Cloudinary
- **Advanced Search**: Search listings by title, location, country, and description
- **Interactive Maps**: Leaflet + OpenStreetMap integration for property locations (100% FREE)
- **Booking System**: Complete booking flow with date validation and availability checking
- **Payment Integration**: Razorpay payment gateway with test mode support
- **Reviews & Ratings**: Users can leave reviews on listings
- **User Profiles**: User account management with profile customization
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS + EJS templating
- **Session Management**: Secure session handling with Express Session

## 🛠️ Tech Stack

**Backend:**
- Node.js (v22.14.0)
- Express.js 5.x
- MongoDB & Mongoose ODM
- Passport.js (Authentication)
- Express-session (Session management)
- Multer (File upload)

**Frontend:**
- EJS Templating
- Tailwind CSS + Bootstrap
- Leaflet Maps + OpenStreetMap (100% FREE - No API key needed)
- JavaScript (Client-side)

**External Services:**
- Cloudinary (Image storage & CDN)
- Razorpay (Payment gateway - Test mode)
- MongoDB Atlas (Cloud database)

## 📋 Prerequisites

- Node.js v22.14.0+
- npm or yarn
- MongoDB Atlas account (free tier available)
- Cloudinary account (free tier available)
- Razorpay account (free tier/test mode available)
- Git & GitHub account for deployment

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
NODE_ENV=production

# Payment Gateway (Razorpay Test Keys)
RAZORPAY_KEY_ID=your_test_razorpay_key_id
RAZORPAY_KEY_SECRET=your_test_razorpay_key_secret

# Cloudinary (Image Storage)
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

**Note:** Maps use Leaflet + OpenStreetMap - NO API KEY NEEDED! ✅

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

## �️ Maps Integration

StayoX uses **Leaflet + OpenStreetMap** for property location mapping:

- ✅ **100% FREE** - No API keys required
- ✅ **No billing setup** - Works immediately  
- ✅ **Interactive** - Click on map to set coordinates
- ✅ **Works on all pages** - Show/New/Edit listing pages
- ✅ **Responsive** - Mobile and desktop friendly

### Map Features:
- View property location on listing detail page
- Click map when creating/editing listings to set coordinates
- Automatic marker placement with property info popup
- Zoom and pan controls

## 🚀 Deployment

### Quick Deploy to Railway (Recommended)

1. **Push to GitHub**:
   ```bash
   git add -A
   git commit -m "Your message"
   git push origin main
   ```

2. **Deploy on Railway**:
   - Go to https://railway.app/dashboard
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository: `satish-rt/StayoX`
   - Railway auto-deploys on every push

3. **Add Environment Variables** in Railway dashboard:
   - Copy all variables from your `.env` file
   - Railway shows your live URL (e.g., `https://stayox-xxx.railway.app`)

4. **Verify Deployment**:
   - ✅ Check maps appear on listing pages
   - ✅ Test booking flow with Razorpay
   - ✅ Verify images upload to Cloudinary
   - ✅ Test user authentication

### Alternative Hosting Options

- **Render.com** - Similar to Railway
- **Replit** - Easy for beginners
- **Heroku** - Traditional choice (paid)

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

ISC

## 👤 Author

- GitHub: [@satish-rt](https://github.com/satish-rt)

## 🆘 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with ❤️ using Node.js, Express, MongoDB, and Leaflet Maps**

**Happy Booking! 🎉**
