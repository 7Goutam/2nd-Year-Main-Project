const express = require("express");
const router =  express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudconfig.js")
const upload = multer({storage })


const ListingController = require("../cantrollers/listing.js")


  // New Route
 

router.route("/")
.get( wrapAsync(ListingController.index))
.post(isLoggedIn,
  
  upload.single('listing[image]'),
  validateListing,
   wrapAsync(ListingController.createListing)
  );


router.get("/new", isLoggedIn, 
ListingController.renderNew);

  router.route("/:id")   
  .get(wrapAsync(ListingController.showListing))
  .put(isLoggedIn,isOwner,
    upload.single('listing[image]'),
    validateListing,
   wrapAsync(ListingController.updateListing))
  .delete(isLoggedIn,isOwner,
   wrapAsync(ListingController.destroyListing));
  
  //Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, 
wrapAsync(ListingController.renderEditForm));
  


module.exports = router;
