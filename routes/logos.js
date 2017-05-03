var express = require('express');
var router = express.Router();
var Logo = require('../models/logo.js');

// Get all logos
router.get('/', function(req, res){
  Logo.find({}, function(err, logos) {
    res.render('logos/alllogos', {logos: logos});
  });  
});

// Induvidual logo Page
// router.get('/:logoId', function(req, res){
//   var id = req.params.logoId;
//   Logo.find({id:id}, function(err, logo) {
//     res.render('logos/logo', {logo: logo});
//   });
// });

router.get('/admin', function(req, res){
  Logo.find({}, function(err, logos) {
    if(err){
      console.log("an error occured: ",err);
    }
    res.render('logos/edit', {logos: logos});
  });    
});

router.post('/create', function(req, res){
  var name  = req.body.name;
  var id = name.replace(/\s+/g, '-').toLowerCase();

  logoObj = {
    id: id,
    name: name,
    imgURL: req.body.imgURL,
    imgThumb: req.body.imgThumb
  };

  Logo.create(logoObj, function(err, logo) {
    if (err) {
      console.log('there was an error creating the logo:', err);
      res.redirect('/');
    } else {
      req.flash('success', 'Logo Created Successfully');
      console.log('logo create successful: ', logo);
      res.redirect('/logos/admin');
    }
  });

});

router.post('/edit/:logoId', function(req, res){
  Logo.findOneAndUpdate({id:req.body.id}, {
    id: req.body.id,
    name: req.body.name,
    imgThumb: req.body.imgThumb,
    imgURL: req.body.imgURL
  }, function(err, logo) {
    if (err) {
      res.redirect('/');
      console.log("error: " + err);
    } else {
      console.log('Logo Has Been Updated', logo);
      req.flash('success', 'Logo Has Been Updated');
      res.redirect('/logos/admin/');
    }
  });
});

router.post('/remove', function(req, res){
  console.log("inside logo route remove");
  Logo.findOneAndRemove({id:req.body.logoId }, function(err, logo) {
      if (err) {
        res.redirect('/');
        console.log("error: " + err);
      } else {
        req.flash('success logo Has Been Deleted');
        res.json(logo);
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