var express = require('express');
var router = express.Router();
var Product = require('../models/product.js');

// Auth
router.get('/auth', function(req, res){
  res.render('auth');
});

// Get Homepage
router.get('/', function(req, res){
  res.render('home');
});

router.get('/test', function(req, res){
  res.render('test');
});

router.get('/about', function(req, res){
  res.render('about');
});

router.get('/logos', function(req, res){
  res.render('logos');
});

router.get('/cart', function(req, res){
  res.render('cart');
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