var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('about');
});

router.post('/', function(req, res) {
    res.send('POST handler for /about route.');
});

module.exports = router;