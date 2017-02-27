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
    name: "rockers-blue-shirt",
    title: "Pickleball Rockers Blue Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "shirt",
    imageURL: "/blueShirt.jpg"
  },
  {
    name: "rockers-yellow-shirt",
    title: "Pickleball Rockers Yellow Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "shirt",
    imageURL: "/yellowShirt.jpg"
  },
  {
    name: "rockers-grey-shirt",
    title: "Pickleball Rockers Grey Shirt",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "shirt",
    imageURL: "/greyShirt.jpg"
  },
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
  },   
  {
    name: "all-jewelry",
    title: "Jewelry Set",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/allJewelry.jpg"
  },
  {
    name: "bracelet",
    title: "Bracelet",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/bracelet.jpg"
  },
  {
    name: "earings-1",
    title: "Earings1",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/earings1.jpg"
  },
  {
    name: "earings-2",
    title: "Earings2",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/earings2.jpg"
  },
  {
    name: "money-clip-1",
    title: "Money Clip 1",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/moneyClip1.jpg"
  },
  {
    name: "money-clip-2",
    title: "Money Clip 2",
    description: "Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    price: 21.99,
    available: true,
    category: "jewelry",
    imageURL: "/moneyClip2.jpg"
  },
  {
    name: "money-clip-3",
    title: "Money Clip 3",
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