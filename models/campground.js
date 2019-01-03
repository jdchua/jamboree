var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    website: String,
    lineup: String,
    genre: String,
    price: String,
    image: String,
    description: String,
    multiDay: String,
    camping: String,
    allAges: String,
    location: String,
    lat: Number,
    lng: Number,
    rating: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
