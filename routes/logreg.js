var express=require("express");
var passport=require("passport");
var router=express.Router();

router.post("/register",passport.authenticate("local-register",{
    successFlash : true,
    successRedirect : "back",
    failureFlash : true,
    failureRedirect : "back"
}))

router.post("/login",passport.authenticate("local-login",{
    successFlash : true,
    successRedirect : "back",
    failureFlash : true,
    failureRedirect : "back"
}))
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("back");
})
router.post("/logout",function(req,res){
    req.logout();
    res.redirect("back");
})

module.exports = router;