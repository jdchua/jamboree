var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

// INDEX - show all campgrounds
router.get("/", function(req, res){
    var perPage = 4;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    var noMatch = null;
    if (req.query.search) {
        var regex = new RegExp(escapeRegex(req.query.search), "gi");
        //find campgrounds in DB
        Campground.find({name: regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.find({name:regex}).count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    if(allCampgrounds.length < 1) {
                        noMatch = "No campgrounds match that query, please try again.";
                    }
                    res.render("campgrounds/index", {
                        campgrounds: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
                        multiDay: req.query.multiday,
                        camping: req.query.camping,
                        electronic: req.query.electronic,
                        mixed: req.query.mixed

                    });
                }
            });
        });
    } else if (req.query.multiday) {
        //find campgrounds in DB
        Campground.find({multiDay: "yes"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.find({multiDay: "yes"}).count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("campgrounds/index", {
                        campgrounds: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
                        multiDay: req.query.multiday,
                        camping: req.query.camping,
                        electronic: req.query.electronic,
                        mixed: req.query.mixed
                    });
                }
            });
        });
    } else if (req.query.camping) {
        //find campgrounds in DB
        Campground.find({camping: "yes"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.find({camping: "yes"}).count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("campgrounds/index", {
                        campgrounds: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
                        multiDay: req.query.mulitday,
                        camping: req.query.camping,
                        electronic: req.query.electronic,
                        mixed: req.query.mixed
                    });
                }
            });
        }); 
    } else if (req.query.electronic) {
        //find campgrounds in DB
        Campground.find({genre: "Electronic"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.find({genre: "Electronic"}).count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("campgrounds/index", {
                        campgrounds: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
                        multiDay: req.query.mulitday,
                        camping: req.query.camping,
                        electronic: req.query.electronic,
                        mixed: req.query.mixed
                    });
                }
            });
        });
    } else if (req.query.mixed) {
        //find campgrounds in DB
        Campground.find({genre: "Mixed"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.find({genre: "Mixed"}).count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("campgrounds/index", {
                        campgrounds: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
                        multiDay: req.query.mulitday,
                        camping: req.query.camping,
                        electronic: req.query.electronic,
                        mixed: req.query.mixed
                    });
                }
            });
        });
    } else {
        //find campgrounds in DB
        Campground.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("campgrounds/index", {
                        campgrounds: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: false,
                        multiDay: false,
                        camping: false,
                        electronic: false,
                        mixed: false
                    });
                }
            });
        });
    }
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var website = req.body.website;
   var genre = req.body.genre;
   var lineup = req.body.lineup;
   var multiDay = req.body.multiDay;
   var camping = req.body.camping;
   var price = req.body.price;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   geocoder.geocode(req.body.location, function (err, data) {
        if (err || !data.length) {
            req.flash('error', 'Invalid address');
            console.log(err);
            return res.redirect('back');
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
        var newCampground = {name: name, image: image, description: desc, author:author, location: location, lat: lat, lng: lng, multiDay: multiDay, camping: camping, price: price, website: website, lineup: lineup, genre: genre};
     // Create a new campground and save to DB
       Campground.create(newCampground, function(err, newlyCreated){
           if (err){
               console.log(err);
           } else {
                // redirect back to campgrounds page
                console.log(newlyCreated);
               res.redirect("/campgrounds");
           }
       });
   });
});


// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err || !foundCampground){
           console.log(err);
           req.flash("error", "Sorry, that campground does not exist");
           return res.redirect("/campgrounds");
       } else {
           console.log(foundCampground);
           //render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    geocoder.geocode(req.body.location, function (err, data) {
        if (err || !data.length) {
            console.log(err);
          req.flash('error', 'Invalid address');
          return res.redirect('back');
        }
        req.body.campground.lat = data[0].latitude;
        req.body.campground.lng = data[0].longitude;
        req.body.campground.location = data[0].formattedAddress;
   
     //find and update the correct campground
       Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
           if (err){
               req.flash("error", err.message);
               res.redirect("/campgrounds");
           } else {
               req.flash("success", "Successfully Updated!");
               res.redirect("/campgrounds/" + req.params.id);
           }
       });
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;