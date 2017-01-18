var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'), //used to manipulate POST
    productCtrl = require('../controllers/productsController');

// Routes
router.route('/')
  .get(productCtrl.index)
  .post(productCtrl.create);

router.route('/about')
  .get(productCtrl.new);  

router.route('/products')
  .get(productCtrl.index);  

  // PATCH update existing product
  // .patch(products.updateproduct)

  // DELETE remove specific product from DB
  // .delete(products.removeproduct);


// router.route('/products/:id')

  // GET return specific product
  // .get(productCtrl.getproduct);

  // PATCH update existing product
  // .patch(products.updateproduct)

  // DELETE remove specific product from DB
  // .delete(products.removeCandy);


module.exports = router;