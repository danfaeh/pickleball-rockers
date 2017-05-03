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
router.get('/admin', function(req, res){
  res.render('admin');
});

router.get('/about', function(req, res){
  About.find({}, function(err, about) {
    res.render('about', {about: about});
  });    
});

router.get('/about/admin', function(req, res){
  About.find({}, function(err, about) {
    res.render('admin/about', {about: about});
  });   
});

router.post('/about', function(req, res){
  About.findOneAndUpdate({id:req.body.id}, {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    signOff: req.body.signOff,
    heroImg: req.body.heroImg
  }, function(err, about) {
    if (err) {
      res.redirect('/');
      console.log("error: " + err);
    } else {
      console.log('About Page Has Been Updated', about);
      req.flash('success', 'Logo Has Been Updated');
      res.redirect('/about/admin');
    }
  });
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