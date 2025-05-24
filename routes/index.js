const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var Database = require('better-sqlite3');
var db = new Database('./data/Populera-produkter.db', { verbose: console.log });
//Annan sökväg för databasen;
//var db = new Database(path.join(__dirname, 'data', 'Populera-produkter.db'), { verbose: console.log });


/* GET home page. */
// Example: Define 'produkt' as an empty array or your actual product data
// Ruta za glavnu stranicu
router.get('/', (req, res) => {
  const heroData = {
    imageName: '400x400.svg',
    title: 'Lorem ipsum dolor',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Tincidunt, justo erat facilisis urna, nec ultricies justo nulla non urna.`
  };

  res.render('index', { 
    title: 'Fraky Fashion', 
    heroData 
  });
});

router.get('/products/:id', function (req, res, next) {
  const productId = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ?';
  const select = db.prepare(sql);
  const product = select.get(productId);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.render('product', {
    title: 'Freaky Fashion - Product',
    product: product
  });
});

module.exports = router;
