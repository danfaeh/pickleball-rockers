var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Account
router.get('/account', ensureAuthenticated, function(req, res){
  res.render('users/account');
});

// Login
router.get('/login', ensureAuthenticated, function(req, res){
  res.render('users/login');
});

// Register
router.get('/register', ensureAuthenticated, function(req, res){
  res.render('users/register');
});

router.post('/register', ensureAuthenticated, function(req, res){
  var form = req.body;

  var name = form.name;
  var email = form.email;
  var username = form.username;
  var password = form.password;
  var password2 = form.password2;

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);  

  var errors = req.validationErrors();

  if(errors){
    res.render('users/register',{
      errors:errors
    });
  } else {
    var newUser = new User({
      name: name,
      email:email,
      username: username,
      password: password
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are registered and can now login');

    res.redirect('/users/login');
  }  
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid password'});
      }
    });
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/login');
});

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




