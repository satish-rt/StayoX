# StayoX - Deployment Guide

**Date Created**: February 6, 2026

## 📱 Deployment Overview

This guide covers deploying **StayoX** (Vacation Rental Booking Platform) on **Render** with:
- **Database**: MongoDB Atlas (Cloud)
- **Image Storage**: Cloudinary (CDN)
- **Payment Gateway**: Razorpay (Test Mode)
- **Maps**: OpenStreetMap/Leaflet (FREE - No API key)

---

## 🗄️ Part 1: MongoDB Atlas Setup (Database)

### Create MongoDB Cluster

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up/Login with Gmail or GitHub
3. Click **Create** → **Build a Database**
4. Choose **M0 (Free Tier)**
5. Select AWS region closest to you
6. Click **Create Cluster** (wait 2-3 minutes)

### Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **+ Add New Database User**
3. Enter:
   - **Username**: `satishrathod26122005`
   - **Password**: Create a strong password (save it!)
   - **Role**: `Atlas Admin`
4. Click **Add User**

### Whitelist IP Address

1. Go to **Network Access** (left sidebar)
2. Click **+ Add IP Address**
3. Enter: `0.0.0.0/0` (allow all IPs for cloud deployment)
4. Click **Confirm**

### Get Connection String

1. Go to **Database** → Click **Connect**
2. Choose **Drivers**
3. Select **Node.js** (4.0 or later)
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Final format:
   ```
   mongodb+srv://satishrathod26122005:YOUR_PASSWORD@cluster0.akj6nei.mongodb.net/wanderlust?retryWrites=true&w=majority
   ```

✅ **Verified Connection String**:
```
mongodb+srv://satishrathod26122005:Wsxv1CDAi93GLO7W@cluster0.akj6nei.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0&tls=true
```

---

## 📸 Part 2: Cloudinary Setup (Image Storage)

### Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up (free tier)
3. Log in to dashboard
4. You'll see:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### Get Your Credentials

1. Dashboard → Copy these values:
   - Cloud Name: `dov3kwjzh`
   - API Key: `635411365185744`
   - API Secret: `QdM10fDXSyuAr9E_cC5ArYsETVk`

✅ **Already configured in `.env`**

---

## 💳 Part 3: Razorpay Setup (Payments)

### Create Razorpay Account

1. Go to [razorpay.com](https://razorpay.com)
2. Sign up (free account)
3. Go to **Settings** → **API Keys**
4. Copy:
   - Key ID: `rzp_test_SAuXmJoNY6o6Tg`
   - Key Secret: `e5jjmofwEhV6ZLHRLsJ8VWsd`

✅ **Already configured in `.env`**

---

## 🚀 Part 4: Deploy on Render

### Step 1: Prepare Your Code

1. Ensure all changes are pushed to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push
   ```

### Step 2: Connect to Render

1. Go to [render.com](https://render.com)
2. Sign up/Login with **GitHub**
3. Click **New +** → **Web Service**
4. Select your **StayoX** repository
5. Click **Connect**

### Step 3: Configure Build Settings

Fill in these fields:
- **Name**: `stayox`
- **Environment**: `Node`
- **Region**: Select closest to you
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `node app.js`

### Step 4: Add Environment Variables

Click **Advanced** → **Add Environment Variable**

Add ALL these variables:

| Variable | Value |
|----------|-------|
| `ATLAS_DB` | `mongodb+srv://satishrathod26122005:Wsxv1CDAi93GLO7W@cluster0.akj6nei.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0&tls=true` |
| `SECRET` | `dwgffhhdbSDGFHBNTGBasffdgf` |
| `CLOUD_NAME` | `dov3kwjzh` |
| `CLOUD_API_KEY` | `635411365185744` |
| `CLOUD_API_SECRET` | `QdM10fDXSyuAr9E_cC5ArYsETVk` |
| `RAZORPAY_KEY_ID` | `rzp_test_SAuXmJoNY6o6Tg` |
| `RAZORPAY_KEY_SECRET` | `e5jjmofwEhV6ZLHRLsJ8VWsd` |
| `NODE_ENV` | `production` |

### Step 5: Deploy

1. Click **Create Web Service**
2. Render will automatically build and deploy
3. Wait for build to complete (3-5 minutes)
4. Your URL will be: `https://stayox.onrender.com` (or similar)

---

## ✅ Verification Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with correct credentials
- [ ] IP whitelist set to `0.0.0.0/0`
- [ ] Connection string verified with database name
- [ ] Cloudinary account created with credentials saved
- [ ] Razorpay test account created
- [ ] All environment variables added to Render
- [ ] Code pushed to GitHub
- [ ] Render deployment successful
- [ ] Website accessible online

---

## 🧪 Testing the Deployment

1. Go to your Render URL
2. Test these features:
   - ✅ Homepage loads
   - ✅ Signup/Login works
   - ✅ Create listing (with image upload)
   - ✅ View listings
   - ✅ Leave reviews
   - ✅ Make booking (test Razorpay)

---

## 📞 Troubleshooting

### "Site can't be reached"
- Check Render logs for errors
- Verify all environment variables are set
- Check MongoDB Atlas IP whitelist

### "Database connection failed"
- Verify MongoDB Atlas credentials
- Ensure IP whitelist includes `0.0.0.0/0`
- Check cloud network access in MongoDB

### "Image upload not working"
- Verify Cloudinary credentials in `.env`
- Check Cloudinary storage quota
- Review Cloudinary API key permissions

### "Payment gateway not working"
- Use Razorpay test cards for testing
- Verify API keys are in test mode (rzp_test_*)
- Check Razorpay account settings

---

## 📝 Environment Variables Summary

```env
# Database
ATLAS_DB=mongodb+srv://satishrathod26122005:Wsxv1CDAi93GLO7W@cluster0.akj6nei.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0&tls=true

# Session
SECRET=dwgffhhdbSDGFHBNTGBasffdgf

# Image Storage (Cloudinary)
CLOUD_NAME=dov3kwjzh
CLOUD_API_KEY=635411365185744
CLOUD_API_SECRET=QdM10fDXSyuAr9E_cC5ArYsETVk

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=rzp_test_SAuXmJoNY6o6Tg
RAZORPAY_KEY_SECRET=e5jjmofwEhV6ZLHRLsJ8VWsd

# Deployment
NODE_ENV=production
```

---

## 🔒 Security Notes

- ⚠️ Never commit `.env` to GitHub (use `.gitignore`)
- ✅ Use test keys for development (rzp_test_*)
- ✅ Rotate passwords regularly
- ✅ Monitor MongoDB Atlas activity
- ✅ Use environment variables in production

---

## 📚 Useful Links

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Render Deployment Guide](https://render.com/docs/deploy-node-express-app)
- [OpenStreetMap/Leaflet](https://leafletjs.com/)

---

**Deployment Date**: February 6, 2026  
**Deployed On**: Render  
**Database**: MongoDB Atlas  
**Image Hosting**: Cloudinary  
**Status**: ✅ Ready for Production
