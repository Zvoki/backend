const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var Database = require('better-sqlite3');
var db = new Database('./data/Populera-produkter.db', { verbose: console.log });
//Annan sökväg för databasen;
//var db = new Database(path.join(__dirname, 'data', 'Populera-produkter.db'), { verbose: console.log });


/* GET home page. */
// Example: Define 'produkt' as an empty array or your actual product data
router.get('/', function(req, res, next) {
  //SQL query to fetch all products
  const sql = 'SELECT * FROM products';
  //Hämta alla produkter
  const select = db.prepare(sql);
  //Skickar SQL kommando till databasen
  //Hämtar alla produkter
  const products = select.all();
  res.render('index', 
  { title: 'Populera produktär', 
    products: products
    });
  });

module.exports = router;
