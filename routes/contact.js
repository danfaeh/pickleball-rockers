var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// Get Contact
router.get('/contact', ensureAuthenticated, function(req, res){
  res.render('contact');
});

router.post('/contact', function(req,res){

  var form = req.body; 

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'PickleBallRocker@gmail.com',
          pass: 'dunedin1'
      }
  });

  // setup email data with unicode symbols
  var mailOptions = {
      from: form.name+" <"+ form.customerEmail + ">",
      to: 'pickleballrockers@tampabay.rr.com', // list of receivers
      subject: 'Message From PickleBallRockers.com', // Subject line
      // text: req.body.message + " my email address is: " + form.customerEmail // plain text body
      html: '<p>'+ form.message +'</p><p>Customer email: '+form.customerEmail+'</p>' // html body
  };  

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log("was not able to send the email ",error);
          res.json({yo: 'error'});
      }else{
          res.redirect("/");
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






