# 🔑 GET THE MISSING 2 KEYS

You have 7 out of 9 keys. Here's how to get the remaining 2:

⚠️ **IMPORTANT:** Google Maps requires billing setup. 
**See MAPS_ALTERNATIVES.md for FREE options!** (Leaflet is recommended)

---

## 1️⃣ GET GOOGLE_MAPS_API_KEY (5 MINUTES)

### Step-by-Step:

**Step 1: Go to Google Cloud Console**

```
Visit: https://console.cloud.google.com
```

**Step 2: Sign In**

```
Login with your Google account
(Same account you use for Gmail)
```

**Step 3: Create a Project**

```
At the top, click: "Select a Project"
Click: "NEW PROJECT"
Project name: StayoX
Click: "CREATE"
Wait 30 seconds...
```

**Step 4: Select Your Project**

```
At the top, click: "Select a Project"
Click: "StayoX"
(Now you're in your project)
```

**Step 5: Enable Maps API**

```
In the search box (top), type: Maps JavaScript API
Press: Enter
```

**Step 6: Click on "Maps JavaScript API"**

```
You'll see the API listed
Click: "Maps JavaScript API"
```

**Step 7: Enable It**

```
Click: "ENABLE" button (blue button)
Wait: 20 seconds for it to enable
```

**Step 8: Create API Key**

```
Click: "Create Credentials" button
In popup, select: "API Key"
Copy the long key that appears

SAVE THIS! This is your GOOGLE_MAPS_API_KEY
```

**Example:**

```
Your key looks like: AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxx
(Long string of letters and numbers)
```

---

## 2️⃣ SET NODE_ENV = production (1 MINUTE)

This is simple. You just need to add it to your environment variables.

### On Railway.app:

**Step 1: Go to Railway Dashboard**

```
Visit: https://railway.app
Login with GitHub
```

**Step 2: Select Your Project**

```
Click: Your StayoX project
```

**Step 3: Go to Variables**

```
Click: "Deployments" tab
Click: Latest deployment
Click: "Settings"
Click: "Variables"
```

**Step 4: Add NODE_ENV**

```
Click: "New Variable"
Name: NODE_ENV
Value: production
Click: Save
```

Done! ✅

---

## 📋 SUMMARY OF YOUR 9 KEYS

Now you should have all 9:

| #   | Key Name            | Status     | From               |
| --- | ------------------- | ---------- | ------------------ |
| 1   | ATLAS_DB            | ✅ Have    | MongoDB Atlas      |
| 2   | SECRET              | ✅ Have    | Your app           |
| 3   | NODE_ENV            | ✅ **NEW** | Set to: production |
| 4   | CLOUD_NAME          | ✅ Have    | Cloudinary         |
| 5   | CLOUD_API_KEY       | ✅ Have    | Cloudinary         |
| 6   | CLOUD_API_SECRET    | ✅ Have    | Cloudinary         |
| 7   | RAZORPAY_KEY_ID     | ✅ Have    | Razorpay           |
| 8   | RAZORPAY_KEY_SECRET | ✅ Have    | Razorpay           |
| 9   | GOOGLE_MAPS_API_KEY | ✅ **NEW** | Google Cloud       |

---

## ✅ QUICK CHECKLIST

- [ ] Got GOOGLE_MAPS_API_KEY from Google Cloud
- [ ] Set NODE_ENV = production on Railway
- [ ] Have all 9 keys ready
- [ ] Added all variables to Railway
- [ ] Deployment shows: SUCCESS (green)
- [ ] Website loads: https://stayox-production-xxxx.up.railway.app
- [ ] Maps display on listing pages
- [ ] All features working

---

## 🚀 NEXT: TEST YOUR WEBSITE

Once you have both keys added to Railway:

1. **Wait 2-3 minutes** for Railway to redeploy
2. **Go to your website:** https://stayox-production-xxxx.up.railway.app
3. **Test these features:**
   - [ ] Click on any listing
   - [ ] Scroll down
   - [ ] Should see MAP with property location
   - [ ] If no map, check if GOOGLE_MAPS_API_KEY is correct

**Maps showing?** ✅ Everything is working!

---

## 🆘 IF MAPS STILL DON'T SHOW

**Check these things:**

1. **Is the key correct?**

   ```
   Copy from Google Cloud again
   Paste in Railway Variables
   Exact match?
   ```

2. **Is Maps API enabled?**

   ```
   Google Cloud Console → APIs & Services
   Search: Maps JavaScript API
   Status should be: ENABLED (blue)
   ```

3. **Wait for redeploy**

   ```
   Railway takes 2-3 minutes to redeploy
   Then refresh browser (Ctrl+R)
   Hard refresh: Ctrl+Shift+R
   ```

4. **Check browser console for errors**
   ```
   On your website, press: F12
   Go to: Console tab
   Look for red error messages
   Usually shows what's wrong
   ```

---

## ✨ YOU'RE ALMOST THERE!

**Just 2 more things:**

1. Get GOOGLE_MAPS_API_KEY (5 min)
2. Add NODE_ENV = production (1 min)

**Then:** Everything is ready for your ma'am! 🎉

---

**Questions while getting the keys?**

- Google Cloud confusing? → Follow the steps exactly
- Can't find buttons? → Try refreshing the page
- Maps still not working? → Check the troubleshooting section

**You've got this!** 💪
