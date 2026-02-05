# AI Coding Agent Instructions - MojorProject

## Project Overview

MojorProject is a full-stack Node.js/Express vacation rental booking platform using MongoDB. The architecture follows MVC patterns with clear separation of concerns: models (data), controllers (business logic), routes (HTTP handlers), and views (EJS templates).

**Key Stack**: Express.js, MongoDB/Mongoose, Passport.js (authentication), Cloudinary (image storage), EJS templating

## Architecture & Critical Data Flows

### Authentication & Authorization Flow

- **Entry Point**: Passport.js with LocalStrategy (username/password auth)
- **Session Management**: Express-session stores user in `req.user` after login
- **Key Middleware** in middleware.js:
  - `isLoggedIn()`: Redirects unauthenticated users to `/listings`, saves original URL for post-login redirect
  - `isOwner()`: Verifies user owns listing before edit/delete (compares `res.locals.currUser._id` with `listing.owner`)
  - `isReviewAuthor()`: Similar pattern for review deletion
- **Flash Messages**: Success/error messages via `connect-flash`, stored in `res.locals.success` and `res.locals.error` for view rendering

### Listing CRUD with Image Handling

- **Image Upload**: Multer middleware chains with Cloudinary storage configuration in cloudConfig.js - images stored remotely, URLs and filenames saved to DB
- **Listings Schema** in models/listing.js: Contains owner reference, review array (populated on GET), map coordinates (latitude/longitude), and property details (type, amenities, bedrooms, etc.)
- **Validation**: Client-side data validated via Joi schema in schema.js in `validateListing` middleware before controller execution
- **Route Pattern** in routes/listing.js: Uses Express `.route()` for chaining methods; middleware applied at route level

### Review & Booking System

- Reviews linked to Listings via nested routes (`/listings/:id/reviews`), auto-populated with author data
- **Booking Flow**: Date selection → Price calculation with taxes/fees → Razorpay payment → Confirmation
- **Booking Model** stores: listing ref, user ref, checkIn/checkOut dates, numberOfNights, totalPrice, guestCount, paymentStatus
- **Price Calculation**: basePrice × nights + 18% GST + 5% service fee (see `calculateBookingPrice()` in controllers/bookings.js)
- **Date Validation**: Checks past dates, date ordering, and availability (no conflicting bookings)
- **Payment Integration**: Razorpay for production (signature verification), simulated payment for testing
- **Refund Logic**: Completed bookings can be cancelled within 24 hours (marked as "refunded" instead of deleted)
- All async operations wrapped with `wrapAsync()` utility for centralized error handling

## Error Handling Pattern

- **Custom Error Class** in utils/ExpressError.js: Inherit with `statusCode` and `message` properties
- **Async Wrapper** in utils/wrapAsync.js: Catches controller errors and passes to Express error handler
- **Example**: `router.get('/:id', wrapAsync(controller.show))` - any thrown error in controller passes to middleware
- **Error Page**: views/error.ejs rendered by main error handler; check app.js for handler placement

## Key Conventions & Patterns

### Middleware Chaining

Authentication and validation applied declaratively at route definition:

```javascript
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single(),
  validateListing,
  wrapAsync(controller.update)
);
```

Order matters: auth → ownership → file upload → validation → controller

### Model References & Population

- Listings hold owner reference (User.\_id) and review array (Review.\_id references)
- Controllers use `.populate()` with nested paths for deep data retrieval:

```javascript
.populate({ path: 'reviews', populate: { path: 'author' } })
```

### Data Normalization

- User schema in models/user.js uses `passportLocalMongoose` plugin—provides `authenticate()` and `serializeUser()` methods
- Amenities field handles both single strings and arrays via Joi `.alternatives()`

### Session Configuration

- Session cookie expires in 7 days (`maxAge: 7*24*60*60*1000`)
- MongoStore integration commented out; currently uses memory store (check `.env` for `SECRET` key)

## Development Workflows

### Environment Setup

- **Env Variables Required**: `NODE_ENV`, `ATLAS_DB` (MongoDB URI), `SECRET` (session key), Cloudinary credentials
- **Node Version**: 22.14.0 (specified in package.json engines)
- **Start Command**: `node app.js` (no npm start script defined)

### Testing & Debugging

- No test framework configured; `npm test` is a placeholder
- Use browser DevTools + network tab to inspect request/response cycles
- MongoDB queries logged via Mongoose debugging: `DEBUG=*` or `DEBUG=mongoose:*`

### File Upload Workflow

1. Front-end form sends multipart/form-data with field name `listing[image]`
2. Multer middleware extracts file → Cloudinary storage instance saves → `req.file.path` and `req.file.filename` returned
3. Controller saves URL and filename to listing schema's `image` object
4. Deletion: stored filename used to remove from Cloudinary (check controller)

## Integration Points & Cross-Component Communication

### Request Flow Example: Update Listing

1. `PUT /listings/:id` → routes/listing.js applies middleware chain
2. `updateListing` controller in controllers/listings.js receives validated data
3. Controller queries Listing, updates fields, saves to MongoDB
4. Flash message set via `req.flash()`, response redirects to show page
5. Redirect triggers GET handler which populates and renders view

### User Navigation Context

- All routes inject `res.locals.currUser` (authenticated user), `res.locals.success/error` (flash messages), and `res.locals.redirectUrl` (post-login redirect)
- Views access via EJS: `<%= currUser.email %>`, `<% if(success) { %>`

## Common Implementation Patterns to Follow

- **New Controller Method**: Wrap async function → Use Joi validation middleware → Query DB with `.populate()` if needed → Flash confirmation → Redirect or render
- **New Route**: Import controller → Define middleware chain → Call controller → Export router
- **New View**: Use views/layouts/boilerplate.ejs as base → Include views/includes/navbar.ejs and footer
- **Ownership/Auth Check**: Always verify `isLoggedIn` middleware before routes that need authentication

## Booking System Deep Dive

### Booking Calculation & Pricing
The `calculateBookingPrice()` helper function (in controllers/bookings.js) handles all price computation:
- Takes: nightlyRate, numberOfNights, guestCount
- Returns: nightlyPrice, tax (18%), platformFee (5%), totalPrice
- Called during booking creation AND payment page rendering for UX display

### Payment Flow (Razorpay Integration)
1. **Booking Creation**: Validates dates/guests → calculates price → saves with `paymentStatus: "pending"`
2. **Payment Page**: Displays pricing breakdown, form with Razorpay checkout button
3. **Order Creation**: `/bookings/:id/create-order` endpoint creates Razorpay order with amount in paise
4. **Payment Verification**: Razorpay callback verified via HMAC-SHA256 signature (production) or simulated (test)
5. **Status Update**: On success, sets `paymentStatus: "completed"` and stores Razorpay payment ID

### Date Availability Checking
`checkDateAvailability()` queries for conflicting bookings with `completed` or `pending` status. Prevents double-booking.

### Booking Cancellation Policy
- **Pending Bookings**: Delete immediately
- **Completed Bookings**: Can cancel within 24 hours, marks as `"refunded"` (not deleted) for audit trail

## Important Notes

- No unit tests; focus on manual testing via browser
- Cloudinary configuration is external service integration—credentials required
- Database is MongoDB Atlas (remote); local development requires internet
- Review the commented MongoStore code in app.js—useful if switching to persistent session storage
