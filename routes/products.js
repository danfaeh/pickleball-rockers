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
    res.render('products/edit', {products: products});
  });    
});

router.post('/edit/:productId', ensureAuthenticated, function(req, res){
  var convertPrice = req.body.price * 100;

  Product.findOneAndUpdate({id:req.body.id}, {
    name: req.body.name,
    description: req.body.description,
    price: convertPrice,
    imgStorage: req.body.imgStorage
  }, function(err, product) {
    if (err) {
      res.redirect('/');
      console.log("error: " + err);
    } else {
      console.log('Product Has Been Updated');
      req.flash('success', 'Product Has Been Updated');
      res.redirect('/products/admin/'+product.category);
    }
  });
});

router.post('/remove', ensureAuthenticated, function(req, res){
  Product.findOneAndRemove({id:req.body.id }, function(err, product) {
      if (err) {
        res.redirect('/');
        console.log("error: " + err);
      } else {
        req.flash('success', 'product ' + product.name + ' Has Been Deleted');
        res.json(product);
      }
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