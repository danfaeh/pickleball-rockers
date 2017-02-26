var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
  name: String,
  title: String,
  description: String,
  price: Number,
  available: Boolean,
  category: String,
  imageURL: String
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;