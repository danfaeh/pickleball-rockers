var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
	name: String,
	type: String,
	size: String
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;