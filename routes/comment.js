var exp=require("express");
var router=exp.Router();
var book=require("../models/bookmodel");
var Comment=require("../models/commentmodel");
var com;
router.post("/:id",function(req,res){
    com={
        text: req.body.comment,
        author: req.user.username
    }
    book.findById(req.params.id, function(err, fp) {
        if(!err) {
            Comment.create(com, function(err, ccom){
                fp.comments.push(ccom);
                fp.save(function(err, saved){
                   res.redirect("/book/" + req.params.id); 
                })
            })
            
        }
        else {
            res.send(err)
        }
    });
})
router.post("/:id/edit",function(req,res){
    edcom=req.params.id;
    req.flash("edcom",edcom);
    res.redirect("back");
})
router.post("/:id/delete",function(req,res){
    Comment.deleteOne({"_id":req.params.id}, function(err, fp) {
        if(!err) {
            res.redirect("back"); 
        }
        else {
            res.send(err);
        }
    });
})
router.post("/:id/edit1",function(req,res){
    Comment.findByIdAndUpdate(req.params.id,{text:req.body.ecomment},function(err,e1com){
        if(!err){
            edcom=null;
            res.redirect("back")
        }
    })
})
module.exports = router;