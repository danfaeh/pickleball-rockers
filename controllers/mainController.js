var Product = require("../models/product");

var MainController = {
  home: function(req, res) {
      res.render("pages/home");
  },
  store: function(req, res) {
    Product.find({}, function(err, items) {
      res.render("pages/store", {products: items});
    });    
  },
  about: function(req, res) {
    res.render("pages/about");
  },
  contact: function(req, res) {
    res.render("pages/contact");
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