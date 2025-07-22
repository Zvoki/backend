var express = require('express');
var router = express.Router();
var path = require('path');
var Database = require('better-sqlite3');
var db = new Database(
  path.join('C:/Workspace/npx/backend-projekt/data/Populera-produkter.db'),
  { verbose: console.log }
);

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM products LIMIT 3';
  const select = db.prepare(sql);
  const products = select.all();
  res.render('three-products', {
    title: 'Svart T- Shirt',
    products: products,
  });
});

// Ruta za prikaz pojedinačnog proizvoda, npr.: "/products/1"
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ?';
  const select = db.prepare(sql);
  const product = select.get(productId);
  
  if (!product) {
    return res.status(404).send('Product not found');
  }
   // Dohvati tri proizvoda za partial three-products
  const sqlThree = 'SELECT * FROM products LIMIT 3';
  const selectThree = db.prepare(sqlThree);
  const products = selectThree.all();
  

  res.render('product', {
    title: product.namn || 'Produkt detaljer',
    product: product,
     products: products
  });
});


module.exports = router;
