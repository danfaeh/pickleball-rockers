var router = require('express').Router();

router.get('/', function(req, res) {
    res.send('About route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /dogs route.');
});

module.exports = router;