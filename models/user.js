// requiring mongoose dependency
var mongoose = require('mongoose');

// defining schema for reminders
var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  createdAt: { type : Date, default: new Date() }
});
// define the model
var User = mongoose.model("User", UserSchema);
// export the model to any files that `require` this one
module.exports = User;