var mongoose = require('mongoose');

var AboutSchema = mongoose.Schema({
  id: String,
  heroImg: String,
  title: String,
  description: String,
  signOff: String  
});

var About = mongoose.model('About', AboutSchema);

module.exports = About;