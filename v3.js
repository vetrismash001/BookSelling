const port = process.env.PORT || 3000;
var exp = require("express");
var app = exp();
var bp = require("body-parser");
var passport = require("passport");
var session = require('express-session');
var flash = require('req-flash');
var mang = require("mongoose");
var passportConfig = require("./config");
passportConfig(passport);
app.use(exp.static("public"));
app.use(bp.urlencoded({extended: true}));
app.set("view engine","ejs");

mang.connect("mongodb://localhost:27017/sales_app",{ useNewUrlParser: true , useUnifiedTopology: true});

var indexRoutes = require("./routes/index");
var commentRoutes = require("./routes/comment");
var logregRoutes =require("./routes/logreg");


app.use(session({
    secret : "Im ok",
    resave : false,
    saveUninitialized : false
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    console.log(req.user + ";;'//");
    res.locals.success = req.flash("success");
    res.locals.regError = req.flash("regError");
    res.locals.logError = req.flash("logError");
    next();
})

app.use("/book",indexRoutes);
app.use("/comment",commentRoutes);
app.use(logregRoutes);

app.listen(port);
