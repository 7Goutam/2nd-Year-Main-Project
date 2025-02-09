const express = require("express");
const router =  express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userCantroller = require("../cantrollers/user.js")

router
.route('/')
.get((req,res)=>{
  res.redirect('/listings')
})
router.route("/signup")
.get( userCantroller.renderSignupForm)
.post( wrapAsync(userCantroller.signup));


router.route("/login")
.get( userCantroller.renderLoginForm)
.post( saveRedirectUrl,
passport.authenticate("local", 
{ failureRedirect: "/login",failureFlash: true}), 
userCantroller.login);



router.get("/logout",userCantroller.logout )
module.exports = router;