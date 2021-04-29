var mang = require("mongoose");
var commentSchema = new mang.Schema({
    text: String,
    author: String
});
var Comment = mang.model("Comment", commentSchema);
module.exports  = Comment; 
