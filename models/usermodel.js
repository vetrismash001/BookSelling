var mang = require("mongoose");

var userSch=new mang.Schema({
    email:String,
    username:String,
    password:String
});
module.exports = mang.model("user",userSch);
