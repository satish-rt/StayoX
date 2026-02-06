# 🔄 MIGRATION GUIDE: From Render → Railway.app

## Keep Your Existing MongoDB Atlas & Cloudinary

You already have everything set up! Just migrating the hosting platform.

---

## ✅ WHAT YOU ALREADY HAVE

### Your Current Setup:

```
✅ MongoDB Atlas Database (ATLAS_DB)
✅ Cloudinary Image Storage (CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET)
✅ Razorpay Payment (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
✅ Google Maps API (GOOGLE_MAPS_API_KEY)
✅ Code on GitHub: https://github.com/satish-rt/StayoX
```

### Environment Variables in Code:

```javascript
// app.js
const dbUrl = process.env.ATLAS_DB;
const secret = process.env.SECRET;

// cloudConfig.js
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// bookings.js
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
```

**Everything is environment variable based!** ✅

---

## 🎯 MIGRATION STEPS

### **STEP 1: Gather Your Existing Credentials (5 minutes)**

Open a document and collect these values from your previous Render setup:

```
☐ ATLAS_DB = (your MongoDB connection string)
☐ SECRET = (your session secret)
☐ NODE_ENV = production
☐ CLOUD_NAME = (from Cloudinary)
☐ CLOUD_API_KEY = (from Cloudinary)
☐ CLOUD_API_SECRET = (from Cloudinary)
☐ RAZORPAY_KEY_ID = (from Razorpay)
☐ RAZORPAY_KEY_SECRET = (from Razorpay)
☐ GOOGLE_MAPS_API_KEY = (from Google Cloud)
```

**Where to find them:**

**MongoDB Atlas:**

```
Go to: https://cloud.mongodb.com
Login
Go to: Databases → Connect
Copy: Connection string (mongodb+srv://...)
This is your ATLAS_DB
```

**Cloudinary:**

```
Go to: https://cloudinary.com/console
Login
Dashboard shows:
- Cloud Name
- API Key
- API Secret (click eye icon)
```

**Razorpay:**

```
Go to: https://dashboard.razorpay.com
Login
Go to: Settings → API Keys
Copy:
- Key ID
- Key Secret
```

**Google Maps:**

```
Go to: https://console.cloud.google.com
Login
Project → Settings → API & Services → Credentials
Copy your API Key
```

---

### **STEP 2: Create Railway.app Account (2 minutes)**

```
Visit: https://railway.app
Click: "Sign Up"
Select: "Sign up with GitHub"
Click: Authorize Railway
Done! ✅
```

---

### **STEP 3: Create New Railway Project (5 minutes)**

```
On Railway dashboard:
Click: "New Project"
Select: "Deploy from GitHub Repo"
```

**Connect GitHub:**

```
It asks: "Select Repository"
Search: "StayoX"
Click: satish-rt/StayoX
Connected! ✅
```

---

### **STEP 4: Add Environment Variables to Railway (5 minutes)**

```
Railway deploys automatically
Click: "Deployments" tab
Click: Latest deployment
Click: "Settings"
Click: "Variables"
```

**Add these 9 variables (click "New Variable" for each):**

**Variable 1: ATLAS_DB**

```
Name: ATLAS_DB
Value: mongodb+srv://your_user:your_password@cluster0.xxxxx.mongodb.net/stayox

Click: Save
```

**Variable 2: SECRET**

```
Name: SECRET
Value: (your existing secret from Render)

Click: Save
```

**Variable 3: NODE_ENV**

```
Name: NODE_ENV
Value: production

Click: Save
```

**Variable 4: CLOUD_NAME**

```
Name: CLOUD_NAME
Value: (from Cloudinary Dashboard)

Click: Save
```

**Variable 5: CLOUD_API_KEY**

```
Name: CLOUD_API_KEY
Value: (from Cloudinary Dashboard)

Click: Save
```

**Variable 6: CLOUD_API_SECRET**

```
Name: CLOUD_API_SECRET
Value: (from Cloudinary Dashboard)

Click: Save
```

**Variable 7: RAZORPAY_KEY_ID**

```
Name: RAZORPAY_KEY_ID
Value: (from Razorpay Dashboard)

Click: Save
```

**Variable 8: RAZORPAY_KEY_SECRET**

```
Name: RAZORPAY_KEY_SECRET
Value: (from Razorpay Dashboard)

Click: Save
```

**Variable 9: GOOGLE_MAPS_API_KEY**

```
Name: GOOGLE_MAPS_API_KEY
Value: (from Google Cloud Console)

Click: Save
```

---

### **STEP 5: Verify Deployment (2 minutes)**

```
On Railway Dashboard:
Watch: "Deployments" tab
Status should be: ✅ SUCCESS (green)

Wait: 2-3 minutes for full startup
```

**See Your Live URL:**

```
In the deployment info:
You'll see: https://stayox-production-xxxx.up.railway.app

This is your new live website!
```

---

### **STEP 6: Test Everything Works (10 minutes)**

**Open your new live website:**

```
Go to: https://stayox-production-xxxx.up.railway.app
```

#### Test 1: Database Connected ✅

```
Click: "Create Listing"
Fill form and submit
Go to MongoDB Atlas
Check: New listing appears in database
✅ Database is working!
```

#### Test 2: Images Upload to Cloudinary ✅

```
When creating listing:
Upload an image
Go to Cloudinary dashboard
Check: Image appears in folder "Wanderlust_DEV"
✅ Image storage is working!
```

#### Test 3: Contact Form ✅

```
Go to: /contact
Fill and submit form
Go to MongoDB Atlas
Check: Contact document created
✅ Form storage is working!
```

#### Test 4: Payment (Test Mode) ✅

```
Create a booking
Go to payment page
Click: "Pay with Razorpay"
Use test card: 4111 1111 1111 1111
Check: Razorpay dashboard shows payment
✅ Payments are working!
```

#### Test 5: Maps Display ✅

```
View any listing with coordinates
Should see map with marker
If no map: Check GOOGLE_MAPS_API_KEY in Variables
✅ Maps are working!
```

---

## 📋 VARIABLE MAPPING

| Variable Name       | Used For           | Where to Get            |
| ------------------- | ------------------ | ----------------------- |
| ATLAS_DB            | MongoDB connection | MongoDB Atlas → Connect |
| SECRET              | Session encryption | Your existing secret    |
| NODE_ENV            | Environment mode   | Set to: production      |
| CLOUD_NAME          | Cloudinary         | Cloudinary Dashboard    |
| CLOUD_API_KEY       | Cloudinary auth    | Cloudinary Dashboard    |
| CLOUD_API_SECRET    | Cloudinary auth    | Cloudinary Dashboard    |
| RAZORPAY_KEY_ID     | Payments           | Razorpay Dashboard      |
| RAZORPAY_KEY_SECRET | Payments           | Razorpay Dashboard      |
| GOOGLE_MAPS_API_KEY | Maps               | Google Cloud Console    |

---

## ✨ YOUR CODE IS ALREADY COMPATIBLE!

### No code changes needed!

Your code already reads from environment variables:

**In app.js:**

```javascript
const dbUrl = process.env.ATLAS_DB; // ✅ Already using
const secret = process.env.SECRET; // ✅ Already using
```

**In cloudConfig.js:**

```javascript
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // ✅ Already using
  api_key: process.env.CLOUD_API_KEY, // ✅ Already using
  api_secret: process.env.CLOUD_API_SECRET, // ✅ Already using
});
```

**In bookings.js:**

```javascript
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // ✅ Already using
  key_secret: process.env.RAZORPAY_KEY_SECRET, // ✅ Already using
});
```

**Everything works out of the box!** ✅

---

## 🔄 MAKING CHANGES AFTER MIGRATION

### Easy workflow (same as before):

```
1. Make a change locally
2. git add .
3. git commit -m "your message"
4. git push origin main

Railway auto-deploys in 2 minutes! ✅
```

**No different than Render!**

---

## 🚀 WHAT'S DIFFERENT FROM RENDER?

| Feature          | Render   | Railway         |
| ---------------- | -------- | --------------- |
| Free tier        | $7/month | $5 credit/month |
| Auto-deploy      | Yes      | Yes             |
| Database         | Separate | Same setup      |
| Image storage    | Separate | Same setup      |
| Deployment speed | 3-5 min  | 2-3 min         |
| Custom domain    | Yes      | Yes             |
| Free period      | No       | $5 credit/month |

**Railway is actually better and faster!** 🚀

---

## ⚠️ BEFORE YOU DELETE RENDER

**Keep Render running for 24 hours while testing Railway:**

```
1. Deploy on Railway ✅
2. Test all features ✅
3. Confirm everything works ✅
4. Then delete Render project
```

**Why?** Rollback option if something breaks.

---

## 💾 BACKUP YOUR DATA

Before any migration:

**Backup MongoDB:**

```
Go to: MongoDB Atlas
Click: Clusters
Click: Backup
Click: Create backup
(Makes copy of your database)
```

**Backup Cloudinary Images:**

```
Go to: Cloudinary
Your images are already backed up
Cloudinary keeps all versions
```

---

## ✅ MIGRATION CHECKLIST

- [ ] Gathered all credentials from Render/services
- [ ] Created Railway.app account
- [ ] Connected GitHub repository
- [ ] Added 9 environment variables to Railway
- [ ] Deployment shows SUCCESS (green)
- [ ] Tested database connection
- [ ] Tested image uploads
- [ ] Tested contact form
- [ ] Tested payments
- [ ] Tested maps
- [ ] No errors in browser console
- [ ] All features working
- [ ] Backed up MongoDB

**All checked?** ✅ Migration complete!

---

## 📞 SHARING YOUR NEW LIVE WEBSITE

Send this to your ma'am:

```
Hi Ma'am,

I've migrated the project to new hosting platform:
👉 https://stayox-production-xxxx.up.railway.app

All features are working:
✅ User registration & login
✅ Create & manage listings
✅ Image uploads
✅ Booking system
✅ Payment processing (test mode)
✅ Reviews & ratings
✅ Contact form
✅ Search functionality

Existing data preserved:
✅ All previous listings
✅ All previous users
✅ All previous bookings

Hosting is faster than before!

Please test and provide feedback.
```

---

## 🆘 IF SOMETHING BREAKS

**Check Railway logs:**

```
Railway Dashboard
→ Deployments
→ Latest deployment
→ Scroll to "Logs"
Look for error message
```

**Common issues:**

**1. Database error:**

```
Check ATLAS_DB variable
Make sure IP is whitelisted in MongoDB (0.0.0.0/0)
```

**2. Image upload fails:**

```
Check CLOUD_NAME is correct
Check CLOUD_API_KEY is correct
Check CLOUD_API_SECRET is correct
```

**3. Payment fails:**

```
Check RAZORPAY_KEY_ID is correct
Check RAZORPAY_KEY_SECRET is correct
Use test card: 4111 1111 1111 1111
```

**4. Maps not showing:**

```
Check GOOGLE_MAPS_API_KEY is correct
Check API is enabled in Google Cloud
```

---

## ✨ YOU'RE DONE!

Migration is simple because:

- ✅ Your code already uses environment variables
- ✅ Railway is faster than Render
- ✅ Auto-deployment still works
- ✅ All data preserved
- ✅ Free hosting for 1 month

**The migration takes 30 minutes total!**

---

## 📊 TIMELINE

```
5 min   → Gather credentials
2 min   → Create Railway account
5 min   → Connect GitHub
5 min   → Add variables
2 min   → Wait for deployment
10 min  → Test all features
1 min   → Verify everything
─────────────────────────────
30 min  → Migration complete! 🚀
```

**Ready to migrate?** Start with STEP 1! 🎯
