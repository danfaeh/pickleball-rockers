var express = require('express');
var router = express.Router();
var Product = require('../models/product.js');
var About = require('../models/about.js');

// Auth
router.get('/auth', function(req, res){
  res.render('auth');
});

// Get Homepage
router.get('/', function(req, res){
  res.render('home');
});

// Admin
router.get('/admin', ensureAdmin, function(req, res){
  res.render('admin');
});

router.get('/cart', function(req, res){
  res.render('cart');
});

router.get('/checkout', function(req, res){
  res.render('checkout');
});

router.get('/confirmation', function(req, res){
  res.render('confirmation');
});

router.post('/auth', function(req,res){
  res.send((req.body.pass === 'dunedin'));
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