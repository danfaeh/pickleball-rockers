var Product = require("../models/product");

var ProductsController = {
  index: function(req, res) {
    Product.find({}, function(err, docs) {
      console.log("docs",docs);
      res.render("pages/home", {products: docs});
    });
  },
  new: function(req, res) {
    res.render("pages/products");
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

module.exports = ProductsController;