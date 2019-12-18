var mongoose = require("mongoose");
var Festival = require("./models/festival");
var Comment   = require("./models/comment");
 
 
function seedDB(){
   //Remove all festivals
   Festival.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed festivals!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            // add a few festivals
            data.forEach(function(seed){
                Festival.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a festival");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
}
 
module.exports = seedDB;
