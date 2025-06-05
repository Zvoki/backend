var express = require('express');
var router = express.Router();
var path = require('path');
var Database = require('better-sqlite3');
var db = new Database(path.join('C:/Workspace/npx/backend-projekt/data/Populera-produkter.db'), { verbose: console.log });
//Annan sökväg för databasen;
//var db = new Database(path.join(__dirname, 'data', 'Populera-produkter.db'), { verbose: console.log });


/* GET home page. */
// Example: Define 'produkt' as an empty array or your actual product data
// Ruta za glavnu stranicu
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM products';
  const select = db.prepare(sql);
  const products = select.all();
  res.render('index', {
    title: 'Freaky Fashion',
    products: products
  });
  
});
// Ruta za pojedinačni proizvod
router.get('/products/:id', function (req, res) {
  const productId = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ?';
  const select = db.prepare(sql);
  const product = select.get(productId);

  if (!product) {
    // Ako proizvod nije pronađen, vraćamo status 404
    return res.status(404).send('Product not found');
  }

  // Ako je proizvod pronađen, renderiramo stranicu proizvoda
  res.render('product', {
    title: 'Svart T-Shirt',
    product: product
  });
});
router.get('/search', (req, res) => {
  const { q } = req.query;
  let query = 'SELECT * FROM products';
  let params = [];

  // Ako postoji query parametar, dodaj WHERE klauzulu
  if (q) {
    query += ' WHERE LOWER(namn) LIKE LOWER(?)';
    params.push(`%${q}%`);
  }

  // Pripremi SQL izjavu
  const stmt = db.prepare(query);

  // Izvrši upit koristeći spread-operator za prosleđivanje parametara
  const products = stmt.all(...params);

  res.render('index', {
    title: 'Freaky Fashion',
    products: products,
    searchQuery: q // Prosledi query za pretragu u view
   
  });
});

module.exports = router;