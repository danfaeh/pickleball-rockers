var express = require('express');
var router = express.Router();
var About = require('../models/about.js');

router.get('/', function(req, res){
  About.find({}, function(err, about) {
      res.render('about', {about: about, aboutPics: about[0].aboutPics});    
  });    
});

router.get('/admin', ensureAdmin, function(req, res){
  About.find({}, function(err, about) {
    res.render('admin/about', {about: about, aboutPics: about[0].aboutPics});
  });   
});

router.post('/', function(req, res){
  console.log("req.body patch",req.body);

  var aboutPics = [];

  for (var item in req.body){
    if (item.startsWith("pic") && req.body[item] !== ""){
      aboutPics.push(req.body[item]);
    }
  }

  console.log("aboutPics",aboutPics);

  About.findOneAndUpdate({id:req.body.id}, {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    signOff: req.body.signOff,
    aboutPics: aboutPics
  }, function(err, about) {
    if (err) {
      res.redirect('/');
      console.log("error: " + err);
    } else {
      req.flash('success', 'about page Updated');
      res.redirect('/about/admin');
    }
  });
});

router.post('/addpic', function(req, res){
  console.log("req.body.pic1",req.body.pic1);
  console.log("req.body post",req.body);
  About.findOneAndUpdate({id:req.body.id}, {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    signOff: req.body.signOff,
    aboutPics: [req.body.pic0,req.body.pic1,req.body.pic2]
  }, function(err, about) {
    if (err) {
      res.redirect('/');
      console.log("error: " + err);
    } else {
      req.flash('success', 'Logo Has Been Updated');
      res.redirect('/about/admin');
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