// var nodemailer = require('nodemailer');

var UserController = {
  login: function(req, res) {
        res.render("pages/login");
  },
  home: function(req, res) {
      if(req.headers.cookie === "dunedin"){
        res.render("pages/home");
      } else{
        res.redirect("/auth");
      }
  }
};

module.exports = UserController;