
var express = require('express'),
		app     = express(),
		port    = 9999,
		about		= require('./routes/about');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/about', about);  

// Middelware
app.use(function(req, res, next) {
  console.log('%s request to %s from %s', req.method, req.path, req.ip);
  next();
});	


app.get('/', function(req, res) {
    res.render('index');
});

app.listen(process.env.PORT || port, function(){
  console.log("Application listening on port: " + (process.env.PORT || port));
});