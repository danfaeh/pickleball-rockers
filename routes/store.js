var express = require('express');
var router = express.Router();

// Get Store
router.get('/store', ensureAuthenticated, function(req, res){
  res.render('store');
});

router.get('/cart', ensureAuthenticated, function(req, res){
  res.render('cart');
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