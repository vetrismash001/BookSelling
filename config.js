var localStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
var User = require("./models/usermodel");
var getUserbyUsername =async function(username){
    var user1;
    await User.findOne({ username : username } , function(err, user){
        if(!err){
            user1 = user;
        }
    })
    return user1;
}
var getUserbyId = async function(id){
    var user1;
    await User.findById(id,function(err,user){
        if(!err){
            user1 = user;
        }
    })
    return user1;
}
var getUserbyEmail = async function(email){
    var user1;
    await User.findOne({email : email},function(err,user){
        if(!err){
            user1 = user;
        }
    })
    return user1;
}
var initialize = function(passport){
    var authenticateUserLogin = async function(req, email, password, done){
        
        var user = await getUserbyEmail(email);
        if(!user){
            return done(null, false, req.flash("logError","Email not registered"));
        }
        bcrypt.compare(password, user.password, function(err, res) {
            if(err){
                return done(err);
            }
            if(res){
                return done(null, user, req.flash("success","Welcome to YelpCamp " + req.body.username));
            }
            return done(null, false, req.flash("logError","Password incorrect"));
        });
    }
    var authenticateUserRegister = async function(req,username, password, done){        
        var user = await getUserbyEmail(req.body.email);
        if(user){
            return done(null, false, req.flash("regError","Email already registered"));
        }
        var user1 = await getUserbyUsername(username);
        if(user1){
            return done(null, false, req.flash("regError","Username already exist"));
        }
        if(req.body.password === req.body.repassword){
            bcrypt.hash(password, 10, function(err, hash) {
                if(!err){
                    User.create({username: username, email : req.body.email , password : hash},function(err,user1){
                        if(!err){
                           return done( null, user1, req.flash("success","Welcome to YelpCamp " + username))
                        }
                    })
                }
                else{
                    return done(err);
                }
            })
        }
        else{
            return done(null, false, req.flash("regError","Passwords are different"));
        }
    }
    passport.use('local-login',new localStrategy({
        usernameField : "email",
        passReqToCallback: true
    },
    authenticateUserLogin));
    passport.use("local-register", new localStrategy({
        passReqToCallback : true },
    authenticateUserRegister));
    passport.serializeUser(function(user,done){
        done(null, user._id);
    })
    passport.deserializeUser(async function(id,done){
        done(null, await getUserbyId(id));
    })
}

module.exports = initialize;