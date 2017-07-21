var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pickleballrockers');
var db = mongoose.connect;

// Shuts down Mongoose correctly on exit
// process.on('exit', function() { 
//   mongoose.disconnect();
// }); 

var pages = require('./routes/pages');
var contact = require('./routes/contact');
var products = require('./routes/products');
var logos = require('./routes/logos');
var users = require('./routes/users');
var about = require('./routes/about');

// Init App
var app = express();

// View Engine
app.set('views', './views');
app.set('view engine', 'hbs');

hbs.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

// Register Partials
hbs.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials'); // partial changes will restart nodemon

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
// app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static("public"));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
      root    = namespace.shift(),
      formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', pages);
app.use('/', contact);
app.use('/products', products);
app.use('/logos', logos);
app.use('/users', users);
app.use('/about', about);

// Set Port
app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function(){
  console.log('Server started on port '+app.get('port'));
});