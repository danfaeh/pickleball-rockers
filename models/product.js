var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  available: Boolean,
  category: String,
  imgExtension: String,
  imgURL: String
});

// Getter
ProductSchema.path('price').get(function(num) {
  return (num / 100).toFixed(2);
});

// Setter
ProductSchema.path('price').set(function(num) {
  return num * 100;
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;