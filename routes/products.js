var express = require('express');
var router = express.Router();
var Product = require('../models/product.js');
var Logo = require('../models/logo.js');

// Get products
router.get('/', function(req, res){
  res.render('products/productCategories');
});

router.get('/Shirts/:productId', function(req, res){
  var id = req.params.productId;
  Product.find({id:id}, function(err, product) {
    Logo.find({}, function(err, logos) {
      res.render('products/shirt', {product: product, logos:logos});
    });    
  });
});

router.get('/Paddles/:productId', function(req, res){
  var id = req.params.productId;
  Product.find({id:id}, function(err, product) {
    res.render('products/paddle', {product: product});
  });
});

router.get('/Jewelry/:productId', function(req, res){
  var id = req.params.productId;
  Product.find({id:id}, function(err, product) {
    res.render('products/jewelry', {product: product});
  });
});

router.get('/admin/:category', ensureAdmin, function(req, res){
  var category = req.params.category;
  Product.find({category:category}, function(err, products) {
    if(err){
      console.log("an error occured: ",err);
    }
    res.render('products/edit', {products: products,category:category});
  });    
});

// Product category Page
router.get('/:category', function(req, res){
  var category = req.params.category;
  Product.find({category:category}, function(err, products) {
    if(Object.keys(products).length === 0){
      res.send("Whoops. Page Not Found");
    } else{
      res.render('products/productCategory', {products: products,category:category});
    }
  });   
});

router.post('/create', ensureAdmin, function(req, res){
  var name  = req.body.name;
  var id = name.replace(/\s+/g, '-').toLowerCase();

  productObj = {
    id: id,
    name: name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    imgURL: req.body.imgURL,
    imgThumb: req.body.imgThumb
  };

  Product.create(productObj, function(err, product) {
    if (err) {
      console.log('there was an error creating the product:', err);
      res.redirect('/');
    } else {
      req.flash('success', 'New Client Created Successfully');
      console.log('product create successful!');
      res.redirect('/products/admin/'+req.body.category);
    }
  });

});

router.post('/edit/:productId', ensureAdmin, function(req, res){
  var convertPrice = req.body.price * 100;

  console.log(req.body);

  Product.findOneAndUpdate({id:req.body.id}, {
    name: req.body.name,
    description: req.body.description,
    price: convertPrice,
    available: req.body.available,
    imgURL: req.body.imgURL,
    imgThumb: req.body.imgThumb
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

router.post('/remove', ensureAdmin, function(req, res){
  Product.findOneAndRemove({id:req.body.productId }, function(err, product) {
      if (err) {
        res.redirect('/');
        console.log("error: " + err);
      } else {
        req.flash('success product Has Been Deleted');
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

function ensureAdmin(req, res, next){  
  if(req.user){
    if(req.isAuthenticated() && req.user.name === "admin"){
      return next();
    } else {
        req.flash('error_msg','You are not logged in');
        res.render('users/unauthorized');
    }
  } else {
        req.flash('error_msg','You are not logged in');
        res.render('users/unauthorized');
    }  
}

// function ensureAuthenticated(req, res, next){  
//   if(req.headers.cookie){
//     if(req.headers.cookie.search("dunedin") !== -1 ){
//       return next();
//     } else {
//       res.redirect("/auth");
//     }
//   }  else {
//       res.redirect("/auth");
//     }
// }

module.exports = router;