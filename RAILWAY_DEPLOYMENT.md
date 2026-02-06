# 🚀 STEP-BY-STEP DEPLOYMENT GUIDE - RAILWAY.APP

## Free Hosting for 1 Month (Perfect for Presentations)

---

## ⏱️ TIME REQUIREMENT

- **Total Time:** 30-45 minutes
- Database setup: 5 min
- API keys: 10 min
- Deployment: 10 min
- Testing: 10 min

---

## 🎯 WHY RAILWAY.APP?

✅ **$5 free credit** = 1 month free hosting
✅ **Auto-deploys** when you push to GitHub (easy updates)
✅ **Full database support** (MongoDB Atlas free)
✅ **Image uploads work** (Cloudinary free)
✅ **Custom domain** (optional)
✅ **No credit card required initially**

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### Before you start, verify everything:

- [ ] GitHub account has your code
- [ ] Code is pushed to: https://github.com/satish-rt/StayoX
- [ ] `.env` file is in `.gitignore` (secrets not in repo)
- [ ] `package.json` exists with all dependencies
- [ ] `app.js` starts with: `const express = require("express")`

**Check GitHub:**

```
Go to: https://github.com/satish-rt/StayoX
You should see all files there ✅
```

---

## 📊 DEPLOYMENT ARCHITECTURE

```
┌─────────────────┐
│   Your Code     │
│  (GitHub Repo)  │
└────────┬────────┘
         │ Push changes
         ↓
┌─────────────────┐
│  Railway.app    │
│  (Your Server)  │
└────────┬────────┘
         │
    ┌────┼────┬─────────┐
    ↓    ↓    ↓         ↓
  Node DB  Images    Emails
  (App) MongoDB Cloudinary
         Atlas
```

---

## ✅ STEP-BY-STEP DEPLOYMENT

### **STEP 1: CREATE MONGODB ATLAS DATABASE (5 minutes)**

#### 1.1 Go to MongoDB

```
Visit: https://www.mongodb.com/cloud/atlas
```

#### 1.2 Create Account

```
Click: "Sign up free"
Email: Use your email
Password: Create strong password
Click: "Create account"
```

#### 1.3 Create First Organization

```
Organization Name: StayoX
Select: Free tier
Click: "Create Organization"
```

#### 1.4 Create First Project

```
Project Name: stayox-project
Click: "Create Project"
```

#### 1.5 Create Cluster

```
Click: "Create a Database"
Select: M0 Sandbox (FREE) ✅
Click: "Create"
```

#### 1.6 Create Database User

```
Username: stayox_user
Password: Generate strong password
  → Copy this password somewhere safe!
Click: "Create User"
```

#### 1.7 Whitelist Your IP

```
Click: "Add My Current IP Address"
Status: You'll see your IP added
OR
Add: 0.0.0.0/0 (allows all - for development)
```

#### 1.8 Get Connection String

```
Click: "Connect"
Select: "Drivers"
Copy the string that looks like:
mongodb+srv://stayox_user:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

#### 1.9 Prepare ATLAS_DB

```
Take the string and modify:
- Replace PASSWORD with your actual password
- Replace DATABASE with "stayox"

Final format:
mongodb+srv://stayox_user:yourpassword@cluster0.xxxxx.mongodb.net/stayox
```

**✅ Save this! You'll need it in Step 5**

---

### **STEP 2: GET RAZORPAY API KEYS (2 minutes)**

#### 2.1 Go to Razorpay

```
Visit: https://razorpay.com
```

#### 2.2 Sign Up

```
Click: "Sign up"
Email: Your email
Password: Create password
Click: "Sign up"
```

#### 2.3 Get Test Keys

```
Go to: Dashboard → Settings → API Keys
Under "Test Keys":
- Copy "Key ID" (long string)
- Copy "Key Secret" (long string)

Keep these safe!
```

**✅ You now have:**

- `RAZORPAY_KEY_ID=` (copy here)
- `RAZORPAY_KEY_SECRET=` (copy here)

---

### **STEP 3: GET GOOGLE MAPS API KEY (3 minutes)**

#### 3.1 Go to Google Cloud

```
Visit: https://console.cloud.google.com
```

#### 3.2 Create Project

```
Click: "Create Project"
Project name: StayoX
Click: "Create"
Wait: 30 seconds...
```

#### 3.3 Enable Maps API

```
Search: "Maps JavaScript API"
Click on it
Click: "ENABLE"
Wait: 10 seconds...
```

#### 3.4 Create API Key

```
Click: "Create Credentials"
Select: "API Key"
Copy the key you see
```

**✅ You now have:**

- `GOOGLE_MAPS_API_KEY=` (copy here)

---

### **STEP 4: GET CLOUDINARY API CREDENTIALS (2 minutes)**

#### 4.1 Go to Cloudinary

```
Visit: https://cloudinary.com
```

#### 4.2 Sign Up

```
Click: "Sign up free"
Email: Your email
Password: Create password
Click: "Sign up"
```

#### 4.3 Get Credentials

```
You'll see Dashboard
Look for these fields:
- Cloud Name (e.g., "djv7k8qx")
- API Key (long number)
- API Secret (long string)

Copy all three!
```

**✅ You now have:**

- `CLOUDINARY_NAME=` (copy here)
- `CLOUDINARY_KEY=` (copy here)
- `CLOUDINARY_SECRET=` (copy here)

---

### **STEP 5: CREATE SECRET KEY (1 minute)**

Generate a random secret:

**Option A: Using Node.js**

```bash
Open PowerShell
Run this command:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Copy the long string that appears
```

**Option B: Use Online Generator**

```
Visit: https://www.uuidonline.com/
Click Generate
Copy the string
```

**✅ You now have:**

- `SECRET=` (your random string)

---

### **STEP 6: DEPLOY ON RAILWAY.APP (10 minutes)**

#### 6.1 Go to Railway

```
Visit: https://railway.app
```

#### 6.2 Sign Up with GitHub

```
Click: "Sign Up"
Click: "Sign up with GitHub"
Authorize Railway
```

#### 6.3 Create New Project

```
Click: "New Project"
Select: "Deploy from GitHub Repo"
```

#### 6.4 Connect GitHub Repository

```
It will ask: "Which repository?"
Search: "StayoX"
Click: Select your "satish-rt/StayoX" repo
```

#### 6.5 Add Environment Variables

```
The deployment page will open
Click: "Variables" tab
You'll see an empty table

Now add each variable (one by one):

Click "New Variable"
Add these 8 variables:
```

**Variable 1:**

```
Name: ATLAS_DB
Value: mongodb+srv://stayox_user:yourpassword@cluster0.xxx.mongodb.net/stayox
Click: Add
```

**Variable 2:**

```
Name: SECRET
Value: (your random secret from Step 5)
Click: Add
```

**Variable 3:**

```
Name: NODE_ENV
Value: production
Click: Add
```

**Variable 4:**

```
Name: RAZORPAY_KEY_ID
Value: (copy from Step 2)
Click: Add
```

**Variable 5:**

```
Name: RAZORPAY_KEY_SECRET
Value: (copy from Step 2)
Click: Add
```

**Variable 6:**

```
Name: GOOGLE_MAPS_API_KEY
Value: (copy from Step 3)
Click: Add
```

**Variable 7:**

```
Name: CLOUDINARY_NAME
Value: (copy from Step 4)
Click: Add
```

**Variable 8:**

```
Name: CLOUDINARY_KEY
Value: (copy from Step 4)
Click: Add
```

**Variable 9:**

```
Name: CLOUDINARY_SECRET
Value: (copy from Step 4)
Click: Add
```

#### 6.6 Deploy

```
All variables added?
Click: "Deploy"
Wait: 2-3 minutes...

You'll see:
✅ Build starting
✅ Dependencies installing
✅ App starting
✅ Your app is LIVE!
```

#### 6.7 Get Your URL

```
On Railway dashboard:
You'll see your deployment URL
Looks like: https://stayox-production-xxxx.up.railway.app

This is your live website!
```

---

## 🌐 YOUR LIVE WEBSITE IS NOW ONLINE!

```
Your website is now accessible at:
https://stayox-production-xxxx.up.railway.app

Share this link with your ma'am! 🎉
```

---

## ✅ VERIFY DEPLOYMENT

### Test Everything Works:

#### 1. **Test Basic Access**

```
Open the URL in browser
You should see StayoX home page
✅ If you see home page = Database is connected!
```

#### 2. **Test User Registration**

```
Click: Signup
Create a test account
Fill all fields
Click: Sign Up
✅ If redirected to /listings = Working!
```

#### 3. **Test Listing Creation**

```
Click: Create Listing
Fill all fields:
- Title: "Test Property"
- Description: "Test description"
- Location: "Test Location"
- Price: 100
- Upload an image
Click: Create Listing

✅ If you see listing with image = Cloudinary working!
✅ If you see it saved = Database working!
```

#### 4. **Test Booking**

```
Click: "Book Now" on any listing
Select dates (future dates)
Click: Book
✅ If you reach payment page = Booking working!
```

#### 5. **Test Payment (Test Mode)**

```
On payment page:
Click: "Pay with Razorpay"
Use test card: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
Click: Pay
✅ If you get confirmation = Payment working!
```

#### 6. **Test Contact Form**

```
Go to: /contact
Fill all fields
Click: Submit
✅ If you see success message = Contact form working!
```

#### 7. **Test Search**

```
Go to: /listings
Search: any word (e.g., "test")
✅ If you see filtered results = Search working!
```

**All tests passed?** ✅ Your app is fully functional!

---

## 🔄 MAKING CHANGES & REDEPLOYING

### This is the EASY part!

#### To Update Your Website:

**Step 1: Make a change locally**

```
Edit any file on your computer
Example: Edit views/home.ejs to change title
Save the file
```

**Step 2: Commit the change**

```
Open PowerShell
cd c:\MOJORPROJECT
git add .
git commit -m "Updated home page title"
```

**Step 3: Push to GitHub**

```
git push origin main
```

**Step 4: Railway auto-deploys!**

```
Go to: https://railway.app
Check Deployments tab
Wait 2 minutes...
Your changes are LIVE! ✅
```

**That's it!** No need to redeploy manually - it's automatic!

---

## 📝 COMMON CHANGES YOU MIGHT MAKE

### **Change 1: Update Listing Price**

```
File: controllers/listings.js
Line: where price is calculated
Make change
Commit & push
✅ LIVE in 2 minutes
```

### **Change 2: Update Home Page Text**

```
File: views/new_home.ejs
Change any text
Commit & push
✅ LIVE in 2 minutes
```

### **Change 3: Add New Feature (Form)**

```
Create new controller file
Create new view file
Add new route
Commit & push
✅ LIVE in 2 minutes
```

### **Change 4: Fix a Bug**

```
Find the bug in code
Fix it
Commit & push
✅ LIVE in 2 minutes
```

---

## 🔍 CHECKING DEPLOYMENT LOGS

If something isn't working:

### **View Logs on Railway:**

```
Go to: https://railway.app
Click: Your project
Click: "Deployments" tab
Click: Latest deployment
Scroll down to "Logs"
Look for error messages

Common errors:
- "Cannot connect to database" → Check ATLAS_DB variable
- "Image upload failed" → Check Cloudinary variables
- "Payment error" → Check Razorpay variables
```

---

## 🆘 TROUBLESHOOTING

### **Problem: "Database connection failed"**

```
Solution:
1. Go to Railway → Variables
2. Check ATLAS_DB is correct
3. Go to MongoDB Atlas
4. Check if IP is whitelisted (0.0.0.0/0)
5. Redeploy on Railway
```

### **Problem: "Images not uploading"**

```
Solution:
1. Check CLOUDINARY_NAME is correct
2. Check CLOUDINARY_KEY is correct
3. Check CLOUDINARY_SECRET is correct
4. Go to Cloudinary dashboard
5. Verify API credentials match
6. Redeploy
```

### **Problem: "Payment not working"**

```
Solution:
1. Check RAZORPAY_KEY_ID is correct
2. Check RAZORPAY_KEY_SECRET is correct
3. Use test card: 4111 1111 1111 1111
4. Check browser console for errors (F12)
```

### **Problem: "Maps not showing"**

```
Solution:
1. Check GOOGLE_MAPS_API_KEY is correct
2. In Google Cloud Console:
   → Check Maps API is ENABLED
   → Check API Key is active
3. Redeploy
```

---

## 💾 BACKUP IMPORTANT INFORMATION

**Save these in a safe place:**

```
MONGODB ATLAS
- URL: mongodb+srv://stayox_user:password@cluster0.xxx
- Username: stayox_user
- Password: (your password)

RAZORPAY
- Key ID: (your key)
- Key Secret: (your secret)

GOOGLE MAPS
- API Key: (your key)

CLOUDINARY
- Cloud Name: (your name)
- API Key: (your key)
- API Secret: (your secret)

RAILWAY
- Project URL: https://stayox-production-xxxx.up.railway.app
- Username: (your Railway username)
- Password: (GitHub login)

GITHUB
- Repository: https://github.com/satish-rt/StayoX
- Username: satish-rt
```

---

## 📅 RAILWAY FREE TIER DETAILS

**Free Credit:** $5/month
**Lasts:** Approximately 1 month of free hosting

**Usage typically:**

- App server: $2-3/month
- Database: $1-2/month
- Storage: $0-1/month
  **Total:** $3-6/month (covers 1 month free)

**After free credit:**

- Pay as you go ($0.001/hour per service)
- Or upgrade to paid plan
- Or use another free hosting

**For presentation:** 1 month is perfect! ✅

---

## 📞 SHARING YOUR LIVE WEBSITE

### Send this to your ma'am:

```
Hi Ma'am,

Please visit my deployed project:
👉 https://stayox-production-xxxx.up.railway.app

Features you can test:
1. Sign up: Create new account
2. Create listing: Add a property with image
3. Book property: Reserve dates
4. Make payment: Test with card 4111 1111 1111 1111
5. Leave review: Rate properties
6. Contact form: Submit inquiry

Test credentials:
- Email: test@example.com
- Password: test123

All forms save to database ✅
All images upload to cloud ✅
All payments are in test mode ✅

Please let me know if you have any feedback!
```

---

## 📊 DEPLOYMENT CHECKLIST (FINAL)

Before presenting to your ma'am, verify:

- [ ] Website loads without errors
- [ ] Can sign up and login
- [ ] Can create listing with image
- [ ] Can search for listings
- [ ] Can book a property
- [ ] Can leave a review
- [ ] Contact form submits
- [ ] Mobile version looks good (F12 → mobile view)
- [ ] No broken links
- [ ] No console errors (F12 → Console tab)

**All checked?** ✅ Ready to present!

---

## 🎯 NEXT STEPS (AFTER PRESENTATION)

1. **Gather Feedback** from your ma'am
2. **Make Changes** locally using guide above
3. **Push Changes** to GitHub
4. **Auto-Deploy** on Railway (2 min)
5. **Show Updated Site** to ma'am

It's that easy! No complicated redeploy steps needed!

---

## 📞 QUICK REFERENCE

**Your Website URL:**

```
https://stayox-production-xxxx.up.railway.app
```

**Admin Contact Panel:**

```
https://stayox-production-xxxx.up.railway.app/admin/contacts
```

**To Make Changes:**

```
1. Edit file locally
2. git add .
3. git commit -m "your message"
4. git push origin main
5. Railway auto-deploys (2 min)
6. ✅ LIVE!
```

---

**Status:** 🟢 Ready to Deploy
**Time Remaining:** 30-45 minutes until live
**Free Hosting:** 1 month+ guaranteed
