var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('home');
});

router.post('/', function(req, res) {
    res.send('POST handler for /home route.');
});

module.exports = router;