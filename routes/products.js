var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('products');
});

router.post('/', function(req, res) {
    res.send('POST handler for /products route.');
});

module.exports = router;