var Festival = require("../models/festival");
var Comment = require("../models/comment");
// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        // does user own the festival?
        Festival.findById(req.params.id, function(err, foundCampground){
            if (err || !foundCampground){
                req.flash("error", "Festival not found");
                res.redirect("back");
            } else {
                 // does user own the festival?
                 if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                     next();
                 } else {
                     req.flash("error", "You don't have permission to do that");
                     res.redirect("back");
                 }            
            }
        });
    } else {
         req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        // does user own the comment?
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err || !foundComment){
                res.redirect("back");
            } else {
                 // does user own the comment?
                 if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                     next();
                 } else {
                     req.flash("error", "You don't have permission to do that");
                     res.redirect("back");
                 }            
            }
        });  
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You Need To Be Logged In To Do That");
    res.redirect("/login");
}

module.exports = middlewareObj;