var mongoose = require('mongoose');

var LogoSchema = mongoose.Schema({
  id: String,
  name: String,
  imgURL: String,
  imgThumb: String,
  imgExtension: String  
});

var Logo = mongoose.model('Logo', LogoSchema);

module.exports = Logo;