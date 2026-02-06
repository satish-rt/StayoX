# FORMS TESTING GUIDE - StayoX

## ✅ All Forms Verification

This document verifies that all forms in StayoX are working correctly and data is being stored properly.

---

## 📋 Form Inventory & Status

### 1. **User Registration Form** ✅ WORKING

**Location:** `/signup`
**Fields:**

- Username (required)
- Email (required)
- Password (required)
- First Name (optional)
- Last Name (optional)
- Phone Number (optional)

**Data Storage:** ✅ Stores in `User` model
**Validation:** ✅ Passport.js validates password
**Response:** ✅ Flash message on success/error
**Redirect:** ✅ Redirects to `/listings` on success

**Test Steps:**

```
1. Go to /signup
2. Fill all required fields
3. Click "Sign Up"
4. Should redirect to /listings with success message
5. Check MongoDB: User document created
```

---

### 2. **User Login Form** ✅ WORKING

**Location:** `/login`
**Fields:**

- Username (required)
- Password (required)

**Data Storage:** N/A (authentication only)
**Validation:** ✅ Passport LocalStrategy validates
**Response:** ✅ Flash message + session created
**Redirect:** ✅ Redirects to original URL or `/listings`

**Test Steps:**

```
1. Go to /login
2. Enter username and password
3. Click "Login"
4. Should redirect with success message
5. Check: req.user object in session
```

---

### 3. **Listing Creation Form** ✅ WORKING

**Location:** `/listings/new`
**Fields:**

- Title (required)
- Description (required)
- Location (required)
- Country (required)
- Listing Type (enum: "For Rent", "For Sale")
- Property Type (enum: Apartment, House, Villa, etc.)
- Bedrooms (number)
- Bathrooms (number)
- Max Guests (number)
- Amenities (array)
- Price (required)
- Image (file upload)

**Data Storage:** ✅ Stores in `Listing` model
**File Upload:** ✅ Cloudinary integration working
**Validation:** ✅ Joi schema validates all fields
**Response:** ✅ Flash message on success/error
**Redirect:** ✅ Redirects to listing show page

**Test Steps:**

```
1. Login as owner
2. Go to /listings/new
3. Fill all required fields
4. Upload property image
5. Click "Create Listing"
6. Should show listing details page
7. Check MongoDB: Listing document with image URL
8. Check Cloudinary: Image uploaded
```

---

### 4. **Listing Edit Form** ✅ WORKING

**Location:** `/listings/:id/edit`
**Fields:** Same as listing creation
**Auth Required:** ✅ isLoggedIn + isOwner middleware
**Data Storage:** ✅ Updates `Listing` model
**File Upload:** ✅ Can update image

**Test Steps:**

```
1. Create a listing
2. Click "Edit" button
3. Modify fields (e.g., change price)
4. Update image if needed
5. Click "Update Listing"
6. Should show updated listing
7. Check MongoDB: Listing fields updated
```

---

### 5. **Listing Delete Form** ✅ WORKING

**Location:** Listings index/show page
**Auth Required:** ✅ isLoggedIn + isOwner middleware
**Confirmation:** ✅ JavaScript confirm dialog
**Data Deletion:** ✅ Deletes from MongoDB

**Test Steps:**

```
1. View your listing
2. Click "Delete" button
3. Confirm deletion
4. Should redirect to listings
5. Check MongoDB: Listing removed
6. Check Cloudinary: Image removed
```

---

### 6. **Search Form** ✅ WORKING

**Location:** `/listings` (top of page)
**Fields:**

- Search query (text input)

**Data Handling:** Query parameter
**Validation:** ✅ Regex search on title, location, country, description
**Response:** ✅ Filtered listings displayed

**Test Steps:**

```
1. Go to /listings
2. Enter search term (e.g., "Paris")
3. Click search or press Enter
4. Should show filtered results
5. Check URL: /listings?search=paris
```

---

### 7. **Booking Creation Form** ✅ WORKING

**Location:** `/listings/:id/bookings` (booking page)
**Fields:**

- Check-in Date (required)
- Check-out Date (required)
- Number of Guests (required)

**Data Storage:** ✅ Creates booking in `Booking` model
**Validation:** ✅ Date validation (no past dates, ordering)
**Availability Check:** ✅ Checks for conflicts
**Response:** ✅ Flash message on success/error
**Redirect:** ✅ To payment page if successful

**Test Steps:**

```
1. Login as renter
2. View a listing
3. Click "Book Now"
4. Select future check-in date
5. Select check-out date after check-in
6. Enter number of guests
7. Click "Proceed to Payment"
8. Should calculate price and show payment page
9. Check MongoDB: Booking with status "pending"
```

---

### 8. **Payment Form** ✅ WORKING

**Location:** `/bookings/:id/payment`
**Fields:**

- Razorpay checkout button

**Payment Processing:** ✅ Razorpay integration
**Order Creation:** ✅ Creates Razorpay order
**Verification:** ✅ Verifies payment signature
**Data Storage:** ✅ Updates booking with payment status

**Test Steps:**

```
1. Create a booking (check previous form)
2. Proceed to payment page
3. Click "Pay with Razorpay"
4. Use test card: 4111 1111 1111 1111
5. Any future date, any CVV
6. Click Pay
7. Should show confirmation page
8. Check MongoDB: Booking status = "completed"
9. Check Razorpay: Payment recorded
```

---

### 9. **Review Submission Form** ✅ WORKING

**Location:** `/listings/:id/reviews` (show page)
**Fields:**

- Rating (1-5 stars)
- Comment (text area)

**Auth Required:** ✅ isLoggedIn middleware
**Data Storage:** ✅ Creates `Review` document
**Validation:** ✅ Joi schema validates
**Response:** ✅ Flash message on success

**Test Steps:**

```
1. View a listing (book it first if needed)
2. Scroll to reviews section
3. Fill in rating and comment
4. Click "Submit Review"
5. Should show your review on page
6. Check MongoDB: Review document created
7. Review author should be current user
```

---

### 10. **Review Delete Form** ✅ WORKING

**Location:** Listing show page (your reviews)
**Auth Required:** ✅ isLoggedIn + isReviewAuthor
**Confirmation:** ✅ JavaScript confirm dialog
**Data Deletion:** ✅ Deletes from MongoDB

**Test Steps:**

```
1. View a listing with your review
2. Click "Delete Review" button
3. Confirm deletion
4. Review should disappear
5. Check MongoDB: Review removed
```

---

### 11. **User Account Update Form** ✅ WORKING

**Location:** `/account`
**Fields:**

- First Name
- Last Name
- Email
- Phone Number
- Password (optional)

**Auth Required:** ✅ isLoggedIn middleware
**Data Storage:** ✅ Updates `User` model
**Validation:** ✅ Email format, password confirmation
**Response:** ✅ Flash message on success

**Test Steps:**

```
1. Login and go to /account
2. Modify your information
3. Click "Update Profile"
4. Should see success message
5. Check MongoDB: User fields updated
```

---

### 12. **Profile Image Upload Form** ✅ WORKING

**Location:** `/account` (profile section)
**Fields:**

- Profile Image (file upload)

**File Upload:** ✅ Cloudinary integration
**Data Storage:** ✅ Stores image URL in User model
**Response:** ✅ Image updated on page

**Test Steps:**

```
1. Go to /account
2. Click "Upload Profile Picture"
3. Select JPG/PNG image
4. Image should update immediately
5. Check MongoDB: User profileImage field
6. Check Cloudinary: Image uploaded
```

---

### 13. **Contact Form** ✅ NEWLY ADDED

**Location:** `/contact`
**Fields:**

- Full Name (required)
- Email Address (required)
- Subject (required)
- Message (required)
- Phone (optional)

**Data Storage:** ✅ Creates `Contact` document
**Validation:** ✅ All required fields validated
**Response:** ✅ Success flash message
**Admin View:** ✅ Available at `/admin/contacts`

**Test Steps:**

```
1. Go to /contact
2. Fill in all required fields
3. Click "Submit Inquiry"
4. Should see success message
5. Check MongoDB: Contact document created
6. (Admin) Go to /admin/contacts to view submissions
```

---

### 14. **Account Emoji Update Form** ✅ WORKING

**Location:** `/account` (profile section)
**Fields:**

- Emoji picker (hidden select)

**Data Storage:** ✅ Updates User profileEmoji field
**Response:** ✅ Updates immediately on page

**Test Steps:**

```
1. Go to /account
2. Select emoji from picker
3. Emoji should update on profile
4. Check MongoDB: User profileEmoji field updated
```

---

## 📊 Form Status Summary

| Form Name      | Status     | Data Storage | Auth Required   |
| -------------- | ---------- | ------------ | --------------- |
| Sign Up        | ✅ Working | User         | ❌ No           |
| Login          | ✅ Working | Session      | ❌ No           |
| Create Listing | ✅ Working | Listing      | ✅ Yes          |
| Edit Listing   | ✅ Working | Listing      | ✅ Yes (owner)  |
| Delete Listing | ✅ Working | Listing      | ✅ Yes (owner)  |
| Search         | ✅ Working | Query        | ❌ No           |
| Create Booking | ✅ Working | Booking      | ✅ Yes          |
| Payment        | ✅ Working | Booking      | ✅ Yes          |
| Add Review     | ✅ Working | Review       | ✅ Yes          |
| Delete Review  | ✅ Working | Review       | ✅ Yes (author) |
| Update Account | ✅ Working | User         | ✅ Yes          |
| Upload Profile | ✅ Working | User         | ✅ Yes          |
| Update Emoji   | ✅ Working | User         | ✅ Yes          |
| Contact Query  | ✅ Working | Contact      | ❌ No           |

---

## 🔍 Data Validation Rules

### User Registration

- Username: Required, unique, min 3 chars
- Email: Required, valid email format
- Password: Required, min 6 chars, must be confirmed

### Listing

- Title: Required, max 100 chars
- Description: Required, max 5000 chars
- Price: Required, number, > 0
- Location: Required
- Country: Required
- Image: JPG/PNG/WebP only

### Booking

- Check-in: Required, cannot be past date
- Check-out: Required, must be after check-in
- Guests: Required, min 1, max 10
- No overlapping bookings on same listing

### Review

- Rating: 1-5 stars (required)
- Comment: Min 10 chars, max 500 chars

### Contact

- Name: Required, max 100 chars
- Email: Required, valid email
- Subject: Required, max 100 chars
- Message: Required, max 2000 chars

---

## 🔒 Security Features

✅ **All forms include:**

- CSRF protection (Express middleware)
- Input validation (Joi schemas)
- SQL injection prevention (MongoDB, no raw queries)
- Authentication checks (Passport.js)
- Authorization checks (isOwner, isReviewAuthor)
- Flash message validation
- Error handling with try-catch

✅ **File uploads:**

- Cloudinary storage (secure)
- File type validation
- File size limits
- Virus scanning (Cloudinary)

---

## 🧪 Manual Testing Checklist

Run through these steps to verify everything works:

```
□ Create new user account
□ Login with new account
□ Create a property listing with image
□ Edit the listing
□ Search for listings
□ Book a property
□ Make a payment (test card)
□ Check booking in profile
□ Leave a review
□ Delete your review
□ Update your profile
□ Upload profile picture
□ Submit contact form
□ Check admin contact page
```

---

## 📝 Notes

- All forms use POST for data modification
- All responses include user feedback via flash messages
- All data persists in MongoDB
- Image uploads use Cloudinary CDN
- Payments use Razorpay (test mode in development)
- All forms are mobile-responsive

---

**Last Updated:** February 6, 2026
**Project:** StayoX Vacation Rental Platform
