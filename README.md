# StayoX - Vacation Rental Booking Platform

> **🚀 Production Ready** | Deployed on Render | Database: MongoDB Atlas | Images: Cloudinary CDN  
> **Last Updated**: February 6, 2026

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

## 🚀 Deployment Guide

**Deployment Date**: February 6, 2026

### Prerequisites for Deployment

Create accounts for these FREE services:

1. **MongoDB Atlas** - Cloud Database (FREE tier)
2. **Cloudinary** - Image Storage & CDN (FREE tier)  
3. **Razorpay** - Payment Gateway (FREE test mode)
4. **Render/Railway** - App Hosting (FREE tier)

### Step 1: Setup MongoDB Atlas (Database)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up and create a **M0 Free Cluster**
3. Create database user: `satishrathod26122005`
4. Whitelist IP: `0.0.0.0/0` (Network Access)
5. Get connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority
   ```

### Step 2: Setup Cloudinary (Image Storage)

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up (FREE account)
3. Get your credentials from Dashboard:
   - `CLOUD_NAME`
   - `CLOUD_API_KEY`
   - `CLOUD_API_SECRET`

### Step 3: Setup Razorpay (Payments)

1. Go to [razorpay.com](https://razorpay.com)
2. Create account and access test mode
3. Get API Keys:
   - `RAZORPAY_KEY_ID` (starts with `rzp_test_`)
   - `RAZORPAY_KEY_SECRET`

### Step 4: Deploy on Render (Recommended)

**Render is more stable than Railway and perfect for production**

#### 4.1 Push Code to GitHub

```bash
git add -A
git commit -m "Prepare for Render deployment - Date: Feb 6, 2026"
git push origin main
```

#### 4.2 Connect Render to GitHub

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **New +** → **Web Service**
4. Select your `StayoX` repository
5. Click **Connect**

#### 4.3 Configure Render Settings

| Setting | Value |
|---------|-------|
| Name | `stayox` |
| Environment | `Node` |
| Region | (Select closest) |
| Build Command | `npm install` |
| Start Command | `node app.js` |

#### 4.4 Add Environment Variables

In Render's **Advanced** section, add these variables:

```env
# Database (MongoDB Atlas)
ATLAS_DB=mongodb+srv://satishrathod26122005:PASSWORD@cluster0.akj6nei.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0&tls=true

# Session (Keep secure!)
SECRET=dwgffhhdbSDGFHBNTGBasffdgf

# Image Storage (Cloudinary)
CLOUD_NAME=dov3kwjzh
CLOUD_API_KEY=635411365185744
CLOUD_API_SECRET=QdM10fDXSyuAr9E_cC5ArYsETVk

# Payment Gateway (Razorpay Test Keys)
RAZORPAY_KEY_ID=rzp_test_SAuXmJoNY6o6Tg
RAZORPAY_KEY_SECRET=e5jjmofwEhV6ZLHRLsJ8VWsd

# Deployment
NODE_ENV=production
```

#### 4.5 Deploy

1. Click **Create Web Service**
2. Wait for build to complete (3-5 minutes)
3. Render provides your live URL: `https://stayox.onrender.com`

### Verify Deployment Works

✅ **Test these features**:
- [ ] Homepage loads
- [ ] User SignUp/Login works
- [ ] Create listing with image (tests Cloudinary)
- [ ] View listings
- [ ] Make booking (tests Razorpay in test mode)
- [ ] Leave reviews
- [ ] Maps display property locations

### Alternative Hosting Platforms

<details>
<summary><b>Railway.app</b></summary>

1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add same environment variables
4. Railway auto-deploys on every push

**Note**: Railway has some SSL issues with MongoDB Atlas - Use Render instead.

</details>

<details>
<summary><b>Glitch.com</b></summary>

1. Go to [glitch.com](https://glitch.com)
2. Click "New Project" → "Import from GitHub"
3. Select your repository
4. Add environment variables
5. Auto-deploys with live URL

</details>

<details>
<summary><b>Heroku (Paid)</b></summary>

1. Create Heroku account
2. Connect GitHub to Heroku
3. Add buildpacks: Node.js
4. Configure environment variables
5. Enable automatic deploys

**Cost**: Free tier discontinued - starts at $7/month

</details>

### Troubleshooting

| Error | Solution |
|-------|----------|
| "Site can't be reached" | Check Render logs for errors |
| "Database connection failed" | Verify MongoDB Atlas IP whitelist is `0.0.0.0/0` |
| "Image upload fails" | Check Cloudinary credentials in environment variables |
| "Payment not working" | Use Razorpay test cards (e.g., 4111 1111 1111 1111) |
| "Maps not showing" | Verify Leaflet CDN is loaded in views |

### For More Details

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive setup instructions.

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

## 🎯 Current Deployment Status

| Component | Service | Status | Free Tier |
|-----------|---------|--------|-----------|
| **Hosting** | Render.com | ✅ Active | Yes |
| **Database** | MongoDB Atlas | ✅ Connected | Yes (M0) |
| **Image Storage** | Cloudinary | ✅ Configured | Yes |
| **Maps** | Leaflet + OpenStreetMap | ✅ Working | Yes (No API key) |
| **Payments** | Razorpay | ✅ Test Mode | Yes |

**Deployed Date**: February 6, 2026  
**Node Version**: v22.14.0  
**Express Version**: 5.x

---

**Built with ❤️ using Node.js, Express, MongoDB Atlas, Cloudinary, and Leaflet Maps**

**Happy Booking! 🎉**
