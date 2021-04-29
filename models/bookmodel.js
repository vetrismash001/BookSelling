var mang=require("mongoose");
var bookSch=new mang.Schema({
    name:String,
    image:String,
    price:Number,
    desc: {type:String, default: "No Description"},
    comments: [
        {
           type: mang.Schema.Types.ObjectId,
           ref: "Comment"
        }
    ]
});
var book=mang.model("book",bookSch);
module.exports=book;