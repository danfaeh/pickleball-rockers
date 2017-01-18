var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/products');
var Product = require("../models/product");
Product.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
});

var Products = [
  {
    name: "hat",
    type: "hat",
    size: "small"
  },
  {
    name: "shirt",
    type: "shirt",
    size: "small"
  },
  {
    name: "paddle",
    type: "paddle",
    size: "small"
  }
];

Product.create(Products, function(err, docs) {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Created:", docs);
    mongoose.connection.close();
  }
});