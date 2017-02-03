var Product = require("../models/product");

var MainController = {
  auth: function(req, res) {
        res.render("pages/auth");
  },
  home: function(req, res) {
      if(req.headers.cookie === "dunedin"){
        res.render("pages/home");
      } else{
        res.render("pages/auth");
      }
  },
  store: function(req, res) {
      if(req.headers.cookie === "dunedin"){
        Product.find({}, function(err, items) {
          res.render("pages/store", {products: items});
        });  
      } else{
        res.render("pages/auth");
      }
  },
  contact: function(req, res) {
      if(req.headers.cookie === "dunedin"){
        res.render("pages/contact");
      } else{
        res.render("pages/auth");
      }    
  },
  create: function(req, res) {
    // strong params
    var name = req.body.name;
    var type = req.body.type;
    Product.create({name: name, type: type}, function(err, doc) {
      // if there there is an error: redirect to reminders#new; else: redirect to reminders#index
      err ? res.redirect("/products") : res.redirect("/products");
    });
  }
};

module.exports = MainController;