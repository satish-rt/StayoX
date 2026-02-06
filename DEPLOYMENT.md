# DEPLOYMENT GUIDE - StayoX

## 🌟 Best FREE Deployment Options

### **Option 1: Replit.com (⭐ EASIEST & RECOMMENDED)**

#### Why Replit?

- ✅ Super simple setup (5 minutes)
- ✅ No credit card required
- ✅ Auto-deploys on file save
- ✅ Free database support
- ✅ Free domain included
- ✅ Perfect for beginners

#### Step-by-Step Instructions:

1. **Go to Replit**
   - Visit [replit.com](https://replit.com)
   - Click **"Sign Up"** → Choose **"Sign up with GitHub"**
   - Authorize Replit to access your GitHub

2. **Create New Repl from GitHub**
   - Click **"+ New Repl"**
   - Select **"Import from GitHub"**
   - Paste your repo URL: `https://github.com/satish-rt/StayoX`
   - Click **"Create Repl"**
   - Replit auto-detects Node.js

3. **Add Environment Variables**
   - Look for **🔒 Secrets** icon (left sidebar)
   - Click **"Add Secret"** and add each variable:

```
ATLAS_DB=mongodb+srv://username:password@cluster.mongodb.net/stayox
SECRET=your-random-secret-key-here
NODE_ENV=production
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
GOOGLE_MAPS_API_KEY=your_maps_api_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

4. **Run Your App**
   - Click **"Run"** button (top)
   - Wait 1-2 minutes for startup
   - Your app is live! 🎉

5. **Access Your App**
   - URL: `https://StayoX.replit.dev`
   - Share this link anywhere

#### Troubleshooting Replit:

- **Port issue?** Replit auto-assigns port 3000
- **Database error?** Check ATLAS_DB connection string
- **Deployment failed?** Check console for errors (Run button area)

---

### **Option 2: Railway.app (Also Simple)**

#### Why Railway?

- ✅ GitHub auto-deploy on push
- ✅ Free $5/month credit
- ✅ No credit card (initially)
- ✅ Better for ongoing development

#### Step-by-Step Instructions:

1. **Go to Railway**
   - Visit [railway.app](https://railway.app)
   - Click **"Login with GitHub"**
   - Authorize Railway

2. **Create New Project**
   - Click **"New Project"**
   - Select **"Deploy from GitHub Repo"**
   - Choose your `StayoX` repository
   - Click **Deploy**

3. **Add Environment Variables**
   - Go to **Settings** → **Variables** tab
   - Click **"New Variable"** for each:
   - Add same variables as Replit (see above)
   - Save changes

4. **Auto-Deploy On Push**
   - Any push to GitHub = auto-deploys
   - No manual steps needed!

5. **Access Your App**
   - Find URL in **Deployments** tab
   - Format: `https://stayox-production.up.railway.app`

---

### **Option 3: Heroku (Free tier discontinued)**

**⚠️ Note:** Heroku removed free tier (Nov 2022)

- Requires credit card ($7-50/month)
- **NOT RECOMMENDED** - use Replit or Railway instead

---

### **Option 4: Vercel (Frontend only)**

⚠️ **Not ideal for full-stack Node.js app**

- Works better with Next.js/serverless
- Requires separate backend hosting
- **SKIP THIS** - use Replit instead

---

## 🔑 Getting Your API Keys & Secrets

### MongoDB Atlas (Database - FREE)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create account → Create free cluster
3. **Get Connection String:**
   - Go to **Connect** → **Drivers** → Copy connection string
   - Replace `<username>:<password>` with your credentials
   - Replace `<database>` with `stayox`
   - Result: `mongodb+srv://user:pass@cluster.mongodb.net/stayox`
   - Use as `ATLAS_DB`

### Razorpay (Payments - FREE Test Mode)

1. Go to [razorpay.com](https://razorpay.com)
2. Sign up → Create account
3. **Get Test Keys:**
   - Go to **Dashboard** → **Settings** → **API Keys**
   - Copy **Key ID** → Use as `RAZORPAY_KEY_ID`
   - Copy **Key Secret** → Use as `RAZORPAY_KEY_SECRET`
4. Use test mode for development
   - Test card: `4111 1111 1111 1111`
   - Any future date expiry

### Google Maps API (Maps - FREE tier)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project (name: "StayoX")
3. **Enable Maps API:**
   - Go to **Enabled APIs** → **Maps JavaScript API**
   - Click **Enable**
4. **Create API Key:**
   - Go to **Credentials** → **Create Credentials** → **API Key**
   - Copy key → Use as `GOOGLE_MAPS_API_KEY`
5. Optional: Restrict to your domains

### Cloudinary (Image Storage - FREE tier)

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up → Create account
3. **Get Credentials:**
   - Go to **Dashboard** (top right)
   - Find:
     - **Cloud Name** → Use as `CLOUDINARY_NAME`
     - **API Key** → Use as `CLOUDINARY_KEY`
     - **API Secret** → Use as `CLOUDINARY_SECRET`

### SESSION SECRET (Random Key)

Generate a random string for `SECRET`:

**Option A:** Use Node.js

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option B:** Use Online Generator

- Go to [uuidonline.com](https://www.uuidonline.com/)
- Generate UUID → Use as SECRET

---

## ✅ Deployment Checklist

Before deploying, verify:

- [ ] GitHub repo is up to date (`git push`)
- [ ] `.env` file NOT in GitHub (check `.gitignore`)
- [ ] MongoDB Atlas cluster created
- [ ] All API keys obtained (Razorpay, Google Maps, Cloudinary)
- [ ] Deployment platform (Replit/Railway) configured
- [ ] All environment variables added to deployment platform
- [ ] No localhost URLs in code (use env variables)

---

## 🚀 Quick Deploy (Replit - 5 Minutes)

```bash
# Copy this checklist:

1. Replit.com → Sign up with GitHub
2. New Repl → Import from GitHub → https://github.com/satish-rt/StayoX
3. Wait for load
4. Add Secrets (lock icon): ATLAS_DB, SECRET, RAZORPAY_KEY_ID, etc.
5. Click "Run"
6. Visit: https://StayoX.replit.dev ✅
```

---

## 📊 Deployment Comparison

| Platform    | Setup Time | Cost             | Auto-Deploy | Recommendation           |
| ----------- | ---------- | ---------------- | ----------- | ------------------------ |
| **Replit**  | 5 min      | FREE             | No          | ⭐ Best for beginners    |
| **Railway** | 10 min     | FREE ($5 credit) | Yes         | ⭐ Best for development  |
| **Heroku**  | 10 min     | $7/month         | Yes         | ❌ No free tier          |
| **Vercel**  | 10 min     | FREE (limited)   | Yes         | ⚠️ Not ideal for Node.js |

---

## 🔧 Troubleshooting Deployment

### **Issue: "Cannot connect to MongoDB"**

- ✅ Check `ATLAS_DB` connection string
- ✅ Verify database credentials
- ✅ Whitelist deployment IP in MongoDB Atlas

### **Issue: "Image upload not working"**

- ✅ Check Cloudinary credentials
- ✅ Verify `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`

### **Issue: "Payment not working"**

- ✅ Use Razorpay test keys (not live)
- ✅ Use test card: `4111 1111 1111 1111`
- ✅ Verify keys in environment variables

### **Issue: "Maps not showing"**

- ✅ Check `GOOGLE_MAPS_API_KEY`
- ✅ Verify API is enabled in Google Cloud Console
- ✅ Check browser console for API errors

### **Issue: "Port already in use"**

- ✅ Replit/Railway auto-assign ports
- ✅ Change app.js to use: `const port = process.env.PORT || 3000`

---

## 📝 After Deployment

1. **Test all features:**
   - Sign up / Login
   - Create listing with image upload
   - Book property
   - Submit contact form
   - Leave review

2. **Set up custom domain (Optional):**
   - **Replit:** Settings → Domains → Add custom domain
   - **Railway:** Settings → Custom Domains → Add

3. **Monitor logs:**
   - Replit: Check Run console
   - Railway: Check Deployments → Logs tab

4. **Make updates:**
   - Push to GitHub
   - Replit: Auto-deploys
   - Railway: Auto-deploys on push

---

## 🎯 Next Steps

1. **Choose platform:** Use Replit (easiest)
2. **Get API keys:** 30 minutes max
3. **Deploy:** 5-10 minutes
4. **Test:** 10 minutes
5. **Share link:** Tell friends! 🎉

---

**Questions?** Check the main README.md for more details about the project architecture and features.
