const { render } = require('ejs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  { title: 'Populera produktär', 
    produkter: produkt
    });
  });

module.exports = router;
