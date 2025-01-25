const express = require("express");
const router =  express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewCantroller = require("../cantrollers/review.js");



router.post("/",isLoggedIn, validateReview,
 wrapAsync(reviewCantroller.createReview));
 
   router.delete("/:reviewId",isLoggedIn,isReviewAuthor,
    wrapAsync(reviewCantroller.destroyReview));

module.exports = router;3