var express=require("express");
var router=express.Router();
var book=require("../models/bookmodel");
var data=[];
var fdata=[];

function find(){
    book.find({},function(err,f){
        if(!err){
            data=f;
        }
    });
}

router.get("/",function(req,res){
    console.log("land page     " + req.user);
    res.render("land");
});
router.get("/index",function(req,res){
    find();
    if(data.length !== 0){
        res.render("index",{data:data});
    }
    else{
        res.render("nothing");
    }
})
router.get("/add",function(req,res){
    res.render("add");
})

router.post("/filter",function(req,res){
    book.find({},function(err,f){
        if(!err){
            data=f;
            var c=0;
            fdata=[];
            for(var i=0;i<data.length;i++){
                if(data[i].price>=req.body.min && data[i].price<=req.body.max){
                    fdata[c]=data[i];
                    c++;
                }
            }
            data=fdata;
            res.redirect("/book/filtered");
        }
    });    
})
router.get("/sort",function(req,res){
    find();
    var temp;
    for(var j=0;j<data.length-1;j++){
        for(var k=j+1;k<data.length;k++){
            if(data[j].price > data[k].price){
                temp=data[j];
                data[j]=data[k];
                data[k]=temp;
            }
        }
    }
    if(data.length !== 0){
        res.render("index",{data:data});
    }
    else{
        res.render("nothing");
    }
})
router.get("/filtered",function(req,res){
    if(fdata.length !== 0){
        res.render("index",{data:data});
    }
    else{
        res.render("noresults");
    }
})
router.get("/:id",function(req,res){
    book.findById(req.params.id).populate("comments").exec(function(err, fid) {
        if(!err) {
            res.render("show",{data:fid,edcom:req.flash("edcom")});
        }
    });
})
router.post("/",function(req,res){
    var obj={
        name:req.body.name,
        image:req.body.image,
        price:req.body.price,
        desc:req.body.desc
    }
    book.create(obj,function(err,fd){
        if(!err){
            find();
            res.redirect("/book");
        }
    });
})
module.exports = router;