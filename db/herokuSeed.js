var mongoose = require('mongoose');
var conn = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pickleballrockers');
var About = require("../models/about");

About.remove({}, function(err) {
  if (err) {
    console.log("There was an error clearing out all About info: ", err);
  }
});

var AboutArray = [
  {
    id: "1",
    title: "About Lyndee Lindsey",
    description: "I'd like to say it was love at first Dink. An Octogenarian introduced me to this game who happens to be a Senior Olympic Champion, if he can play this game four days a week why can't I just pick up a paddle in my 50's? I was hooked!! However spending 7 out of my 12 months of playing injured what's a girl to do but create Pickleball Rockers! With love of Art and Pickleball, I've started designing personalized logos with Picklepal traveling every city, state and country. I'm happy to design your logo(s) with your location or favorite pastime in mind.",
    signOff: "Please take a look and email me for customization:",
    heroImg: "http://i.imgur.com/XepWED6.jpg",
  }
];

About.create(AboutArray, function(err, about) {
  if (err) {
    console.log("There was an error creating initial logos: ", err);
  } else {
    console.log("Created:", about);
  }
});



