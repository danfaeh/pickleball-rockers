
var express 	= require('express'),
		app     	= express(),
		port    	= 9999,
		products	= require('./routes/products'),			
		home			= require('./routes/home'),		
		about			= require('./routes/about');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public')) ;

app.use(function(req, res, next) {
  console.log('%s request to %s from %s', req.method, req.path, req.ip);
  next();
});	

//routing
app.use('/', home);
app.use('/about', about);
app.use('/products', products);

app.listen(process.env.PORT || port, function(){
  console.log("Application listening on port: " + (process.env.PORT || port));
});