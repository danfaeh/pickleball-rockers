var mongoose = require('mongoose');
var conn = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pickleballrockers');
var Product = require("../models/product");

Product.remove({}, function(err) {
  if (err) {
    console.log("There was an error clearing out all products: ", err);
  }
});

var Products = [
  {
    id: "rockers-blue-shirt",
    name: "Pickleball Rockers Blue Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "shirt",
    imageURL: "/blueShirt.jpg"
  },
  {
    id: "rockers-yellow-shirt",
    name: "Pickleball Rockers Yellow Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "shirt",
    imageURL: "/yellowShirt.jpg"
  },
  {
    id: "rockers-grey-shirt",
    name: "Pickleball Rockers Grey Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "shirt",
    imageURL: "/greyShirt.jpg"
  },
  {
    id: "lover-white-crew-drifit",
    name: "Pickleball Lover Dri-FIT Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "shirt",
    imageURL: "/loverShirt.png"
  },
  {
    id: "rockers-white-crew-drifit",
    name: "Pickleball Rockers Dri-FIT Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "shirt",
    imageURL: "/rockersShirt.png"
  },
  {
    id: "paddle-colorado",
    name: "Colorado Paddle",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 31.99,
    available: true,
    category: "paddle",
    imageURL: "/coloradoPaddle.jpg"
  },
  {
    id: "paddle-canada",
    name: "Canada Paddle",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 31.99,
    available: true,
    category: "paddle",
    imageURL: "/canadaPaddle.jpg"
  },  
  {
    id: "paddle-pickleball-rockers",
    name: "Pickleball Rockers Paddle",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 31.99,
    available: true,
    category: "paddle",
    imageURL: "/rockersPaddle.jpg"
  },
  {
    id: "paddle-pickleball-lover",
    name: "Pickleball Lover Paddle",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 31.99,
    available: true,
    category: "paddle",
    imageURL: "/loverPaddle.jpg"
  },   
  {
    id: "all-jewelry",
    name: "Jewelry Set",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/allJewelry.jpg"
  },
  {
    id: "bracelet",
    name: "Bracelet",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/bracelet.jpg"
  },
  {
    id: "earings-1",
    name: "Earings1",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/earings1.jpg"
  },
  {
    id: "earings-2",
    name: "Earings2",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/earings2.jpg"
  },
  {
    id: "money-clip-1",
    name: "Money Clip 1",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/moneyClip1.jpg"
  },
  {
    id: "money-clip-2",
    name: "Money Clip 2",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/moneyClip2.jpg"
  },
  {
    id: "money-clip-3",
    name: "Money Clip 3",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/moneyClip3.jpg"
  }
];

Product.create(Products, function(err, products) {
  if (err) {
    console.log("There was an error creating initil products: ", err);
  } else {
    console.log("Created:", products);
    mongoose.connection.close();
  }
});