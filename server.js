
var express 		= require('express'),
	app    			= express(),
    http 			= require('http').Server(app),
	mongoose 		= require('mongoose'),
    hbs             = require('hbs'),  
    hbsutils        = require('hbs-utils')(hbs),
    bodyParser 		= require('body-parser'),
    methodOverride 	= require('method-override'),		
	mainCtlr		= require('./controllers/mainController'),
    fs              = require('fs');


// Connect Database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/products');

// Shuts down Mongoose correctly on exit
process.on('exit', function() { 
	mongoose.disconnect();
}); 

// allows for put/delete request in html form
// app.use(methodOverride('_method'));

//View Engine
app.set('view engine', 'hbs');
app.set('views', './views');
hbs.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials'); // partial changes will restart nodemon
// register navbar and client partial to be used in all views
//cwd = current working directory
// hbs.registerPartial('navbar', fs.readFileSync(process.cwd() + '/views/partials/navbar.hbs', 'utf8'));
// hbs.registerPartial('client', fs.readFileSync(process.cwd() + '/views/partials/client.hbs', 'utf8'));

// passport config
// passport.use(new LocalStrategy(db.User.authenticate()));
// passport.serializeUser(db.User.serializeUser());
// passport.deserializeUser(db.User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser({limit: '100mb'}));
app.use(bodyParser.json({extended: true}));

// serve static files from public folder
app.use("/public", express.static("public"));

// ROOT ROUTE
// app.get('/', function (req, res) {
//     if(req.user) {
//       // res.render('main', {user: JSON.stringify(req.user)});
//       res.redirect('/clients');
//     }
//     else {
//       res.redirect('/login');
//     }
// });

// CLIENTS ROUTS
app.get('/', mainCtlr.home);
app.get('/store', mainCtlr.store);
app.get('/contact', mainCtlr.contact);
app.get('/auth', mainCtlr.auth);
app.post('/auth', function(req,res){
    //console.log("req",req);
    res.send((req.body.pass === 'dunedin'));
});
// app.post('/client', ctrl.clients.create);
// app.get('/clients/:id', ctrl.clients.show);
// app.delete('/clients/:id', ctrl.clients.destroy);
// app.put('/clients/:id', ctrl.clients.update);

// AUTH ROUTES
// app.get('/signup', ctrl.auth.users.signup);
// app.post('/signup', ctrl.auth.users.create);
// app.get('/login', ctrl.auth.users.getLogin);
// app.post('/login', ctrl.auth.users.login);
// app.get('/logout', ctrl.auth.users.logout);
// app.get('/verifyemail/:token', ctrl.auth.users.verifyEmail);
// app.get('/resetpass/:token', ctrl.auth.users.getResetPass);
// app.get('/resetpassreq', ctrl.auth.users.getResetPassReq);
// app.post('/resetpass', ctrl.auth.users.resetPass);
// app.post('/resetpassreq', ctrl.auth.users.resetPassReq);

//ERROR ROUTES
app.get('/500', function (req, res) {
    res.render('error_pages/500', {user: JSON.stringify(req.user)});
});
app.get('/422', function (req, res) {
    res.render('error_pages/422', {user: JSON.stringify(req.user)});
});

http.listen((process.env.PORT || 4000), function(){
  console.log("Application listening on port: " + (process.env.PORT || 4000));
});





