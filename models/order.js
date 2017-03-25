var mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({
  id: String,
  total: String,
  customer: String,
  quantity: Number,
  items: Array
});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;