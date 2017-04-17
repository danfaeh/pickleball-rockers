var express = require('express');
var router = express.Router();
var Product = require('../models/product.js');

// Get products
router.get('/', ensureAuthenticated, function(req, res){
  Product.find({}, function(err, products) {
    res.render('products/allproducts', {products: products});
  });  
});

router.get('/:productId', ensureAuthenticated, function(req, res){
  var id = req.params.productId;
  Product.find({id:id}, function(err, product) {
    res.render('products/product', {product: product});
  });
});

router.get('/admin/:category', ensureAuthenticated, function(req, res){
  var category = req.params.category;
  Product.find({category:category}, function(err, products) {
    if(err){
      console.log("an error occured: ",err);
    }
    console.log("DANfind",products);
    res.render('products/edit', {products: products});
  });    
});

router.get('/:productId/edit', ensureAuthenticated, function(req, res){
  var id = req.params.productId;
  Product.find({id:id}, function(err, product) {
    res.render('products/edit', {product: product});
  });
});

// function ensureAuthenticated(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//   } else {
//     req.flash('error_msg','You are not logged in');
//     res.redirect('/users/login');
//   }
// }

function ensureAuthenticated(req, res, next){  
  if(req.headers.cookie){
    if(req.headers.cookie.search("dunedin") !== -1 ){
      return next();
    } else {
      res.redirect("/auth");
    }
  }  else {
      res.redirect("/auth");
    }
}

module.exports = router;