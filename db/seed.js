var mongoose = require('mongoose');
var conn = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pickleballrockers');
var Product = require("../models/product");
var Logo = require("../models/logo");
var About = require("../models/about");

Product.remove({}, function(err) {
  if (err) {
    console.log("There was an error clearing out all products: ", err);
  }
});

Logo.remove({}, function(err) {
  if (err) {
    console.log("There was an error clearing out all logos: ", err);
  }
});

About.remove({}, function(err) {
  if (err) {
    console.log("There was an error clearing out all About info: ", err);
  }
});

var Products = [
  {
    id: "rockers-blue-shirt",
    name: "Pickleball Rockers Blue Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 45.00,
    available: true,
    category: "Shirts",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/blueShirt.jpg"
  },
  {
    id: "rockers-yellow-shirt",
    name: "Pickleball Rockers Yellow Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 45.00,
    available: true,
    category: "Shirts",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/yellowShirt.jpg"
  },
  {
    id: "rockers-grey-shirt",
    name: "Pickleball Rockers Grey Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 45.00,
    available: true,
    category: "Shirts",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/greyShirt.jpg"
  },
  {
    id: "lover-white-crew-drifit",
    name: "Pickleball Lover Dri-FIT Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 45.00,
    available: true,
    category: "Shirts",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/loverShirt.png"
  },
  {
    id: "rockers-white-crew-drifit",
    name: "Pickleball Rockers Dri-FIT Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 45.00,
    available: true,
    category: "Shirts",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/rockersShirt.png"
  },
  {
    id: "paddle-colorado",
    name: "Colorado Paddle",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 135.00,
    available: true,
    category: "Paddles",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/coloradoPaddle.jpg"
  },
  {
    id: "paddle-canada",
    name: "Canada Paddle",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 135.00,
    available: true,
    category: "Paddles",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/canadaPaddle.jpg"
  },  
  {
    id: "paddle-pickleball-rockers",
    name: "Pickleball Rockers Paddle",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 135.00,
    available: true,
    category: "Paddles",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/rockersPaddle.jpg"
  },
  {
    id: "paddle-pickleball-lover",
    name: "Pickleball Lover Paddle",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 135.00,
    available: true,
    category: "Paddles",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/loverPaddle.jpg"
  },   
  {
    id: "all-jewelry",
    name: "Jewelry Set",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "Jewelry",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/allJewelry.jpg"
  },
  {
    id: "bracelet",
    name: "Bracelet",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "Jewelry",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/bracelet.jpg"
  },
  {
    id: "earings-1",
    name: "Earings1",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "Jewelry",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/earings1.jpg"
  },
  {
    id: "earings-2",
    name: "Earings2",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "Jewelry",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/earings2.jpg"
  },
  {
    id: "money-clip-1",
    name: "Money Clip 1",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "Jewelry",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/moneyClip1.jpg"
  },
  {
    id: "money-clip-2",
    name: "Money Clip 2",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "Jewelry",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/moneyClip2.jpg"
  },
  {
    id: "money-clip-3",
    name: "Money Clip 3",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "Jewelry",
    imgURL: "http://i.imgur.com/efH1Aem.jpg",
    imgExtension: "/moneyClip3.jpg"
  }
];

var Logos = [
  {
    id: "homelogo",
    name: "homelogo",
    imgURL: "http://i.imgur.com/P2FJlQu.png",
    imgExtension: "/HomePageLogo.png"
  },
  {
    id: "arizona",
    name: "arizona",
    imgURL: "http://i.imgur.com/KyPJTGi.png",
    imgExtension: "/HomePageLogo.png"
  }
];

var AboutArray = [
  {
    id: "1",
    title: "About Lyndee Lindsey",
    description: "I'd like to say it was love at first Dink. An Octogenarian introduced me to this game who happens to be a Senior Olympic Champion, if he can play this game four days a week why can't I just pick up a paddle in my 50's? I was hooked!! However spending 7 out of my 12 months of playing injured what's a girl to do but create Pickleball Rockers! With love of Art and Pickleball, I've started designing personalized logos with Picklepal traveling every city, state and country. I'm happy to design your logo(s) with your location or favorite pastime in mind.",
    signOff: "Please take a look and email me for customization:",
    aboutPics: ["http://i.imgur.com/XepWED6l.jpg","http://i.imgur.com/ujkhswCl.jpg","http://i.imgur.com/rzzmYIQl.jpg"],
  }
];


Product.create(Products, function(err, products) {
  if (err) {
    console.log("There was an error creating initial products: ", err);
  } else {
    console.log("Created Products:", products);
  }
});

Logo.create(Logos, function(err, logos) {
  if (err) {
    console.log("There was an error creating initial logos: ", err);
  } else {
    console.log("Created:", logos);
  }
});

About.create(AboutArray, function(err, about) {
  if (err) {
    console.log("There was an error creating initial logos: ", err);
  } else {
    console.log("Created:", about);
  }
});



