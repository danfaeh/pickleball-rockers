var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/pickleballrockers');
var Product = require("../models/product");

Product.remove({}, function(err) {
  if (err) {
    console.log("There was an error clearing out all products: ", err);
  }
});

var Products = [
  {
    name: "lover-white-crew-drifit",
    title: "Pickleball Lover Dri-FIT Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "shirt",
    imageURL: "/loverShirt.png"
  },
  {
    name: "rockers-white-crew-drifit",
    title: "Pickleball Rockers Dri-FIT Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "shirt",
    imageURL: "/rockersShirt.png"
  },
  {
    name: "paddle-pickleball-rockers",
    title: "Pickleball Rockers Paddle",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 31.99,
    available: true,
    category: "paddle",
    imageURL: "/rockersPaddle.jpg"
  },
  {
    name: "paddle-pickleball-lover",
    title: "Pickleball Lover Paddle",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 31.99,
    available: true,
    category: "paddle",
    imageURL: "/loverPaddle.jpg"
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