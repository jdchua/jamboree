var express = require("express");
var router = express.Router();
var Festival = require("../models/festival");
var middleware = require("../middleware");

var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

// INDEX - show all festivals
router.get("/", function(req, res){
    var perPage = 9;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    var noMatch = null;
    if (req.query.search) {
        var regex = new RegExp(escapeRegex(req.query.search), "gi");
        //find festivals in DB
        Festival.find({name: regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Festival.find({name:regex}).count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    if(allCampgrounds.length < 1) {
                        noMatch = "No festivals match that query, please try again.";
                    }
                    res.render("festivals/index", {
                        festivals: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
                        multiDay: req.query.multiday,
                        camping: req.query.camping,
                        electronic: req.query.electronic,
                        variety: req.query.variety,
                        allAges: req.query.allAges,
                        hiphop: req.query.hiphop
                    });
                }
            });
        });
    } else if (req.query.multiday) {
        //find festivals in DB
        Festival.find({multiDay: "yes"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Festival.find({multiDay: "yes"}).count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("festivals/index", {
                        festivals: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
                        multiDay: req.query.multiday,
                        camping: req.query.camping,
                        electronic: req.query.electronic,
                        variety: req.query.variety,
                        allAges: req.query.allAges,
                        hiphop: req.query.hiphop
                    });
                }
            });
        });
    } else if (req.query.camping) {
        //find festivals in DB
        Festival.find({camping: "yes"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Festival.find({camping: "yes"}).count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("festivals/index", {
                        festivals: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
                        multiDay: req.query.mulitday,
                        camping: req.query.camping,
                        electronic: req.query.electronic,
                        variety: req.query.variety,
                        allAges: req.query.allAges,
                        hiphop: req.query.hiphop
                    });
                }
            });
        }); 
    } else if (req.query.electronic) {
        //find festivals in DB
        Festival.find({genre: "Electronic"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Festival.find({genre: "Electronic"}).count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("festivals/index", {
                        festivals: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
                        multiDay: req.query.mulitday,
                        camping: req.query.camping,
                        electronic: req.query.electronic,
                        variety: req.query.variety,
                        allAges: req.query.allAges,
                        hiphop: req.query.hiphop
                    });
                }
            });
        });
    } else if (req.query.variety) {
        //find festivals in DB
        Festival.find({genre: "Variety"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Festival.find({genre: "Variety"}).count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("festivals/index", {
                        festivals: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
                        multiDay: req.query.mulitday,
                        camping: req.query.camping,
                        electronic: req.query.electronic,
                        variety: req.query.variety,
                        allAges: req.query.allAges,
                        hiphop: req.query.hiphop

                    });
                }
            });
        });
    } else if (req.query.hiphop) {
        //find festivals in DB
        Festival.find({genre: "Hip-Hop"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Festival.find({genre: "Hip-Hop"}).count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("festivals/index", {
                        festivals: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
                        multiDay: req.query.mulitday,
                        camping: req.query.camping,
                        electronic: req.query.electronic,
                        variety: req.query.variety,
                        allAges: req.query.allAges,
                        hiphop: req.query.hiphop

                    });
                }
            });
        });
    } else if (req.query.allAges) {
        //find festivals in DB
        Festival.find({allAges: "yes"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Festival.find({allAges: "yes"}).count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("festivals/index", {
                        festivals: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
                        multiDay: req.query.mulitday,
                        camping: req.query.camping,
                        electronic: req.query.electronic,
                        variety: req.query.variety,
                        allAges: req.query.allAges,
                        hiphop: req.query.hiphop
                    });
                }
            });
        });
    } else {
        //find festivals in DB
        Festival.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Festival.count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("festivals/index", {
                        festivals: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: false,
                        multiDay: false,
                        camping: false,
                        electronic: false,
                        variety: false,
                        allAges: false,
                        hiphop: false
                    });
                }
            });
        });
    }
});

//CREATE - add new festival to DB
router.post("/", middleware.isLoggedIn, function(req, res){
   // get data from form and add to festivals array
   var name = req.body.name;
   var website = req.body.website;
   var genre = req.body.genre;
   var lineup = req.body.lineup;
   var multiDay = req.body.multiDay;
   var camping = req.body.camping;
   var allAges = req.body.allAges;
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
        var newCampground = {name: name, image: image, description: desc, author:author, location: location, lat: lat, lng: lng, multiDay: multiDay, camping: camping, price: price, website: website, lineup: lineup, genre: genre, allAges: allAges};
     // Create a new festival and save to DB
       Festival.create(newCampground, function(err, newlyCreated){
           if (err){
               console.log(err);
           } else {
                // redirect back to festivals page
                console.log(newlyCreated);
               res.redirect("/festivals");
           }
       });
   });
});


// NEW - show form to create new festival
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("festivals/new");
});

// SHOW - shows more info about one festival
router.get("/:id", function(req, res){
    //find the festival with provided ID
    Festival.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err || !foundCampground){
           console.log(err);
           req.flash("error", "Sorry, that festival does not exist");
           return res.redirect("/festivals");
       } else {
           console.log(foundCampground);
           //render show template with that festival
           res.render("festivals/show", {campground: foundCampground});
       }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Festival.findById(req.params.id, function(err, foundCampground){
        res.render("festivals/edit", {campground: foundCampground});
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
   
     //find and update the correct festival
       Festival.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
           if (err){
               req.flash("error", err.message);
               res.redirect("/festivals");
           } else {
               req.flash("success", "Successfully Updated!");
               res.redirect("/festivals/" + req.params.id);
           }
       });
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Festival.findByIdAndRemove(req.params.id, function(err){
        if (err){
            res.redirect("/festivals");
        } else {
            res.redirect("/festivals");
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;