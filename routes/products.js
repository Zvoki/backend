var express = require('express');
var router = express.Router();

// GET /products
// T.ex. /products/1, /produkter/2 osv
router.get('/:id', function(req, res, next) {
  // Render the 'products' view and pass the title variable
  res.render('detaljsidan', { title: 'Svart T-Shirt' });
});

module.exports = router;
