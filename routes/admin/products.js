const express = require('express');
const router = express.Router();
const path = require('path');
const Database = require('better-sqlite3');

// Ispravna putanja s dvostrukim backslash-evima
const dbPath = path.join('C:/Workspace/npx/backend-projekt/data/Populera-produkter.db');
let db;
try {
  db = new Database(dbPath, { verbose: console.log });
  console.log('Povezan s bazom podataka na ' + dbPath);
} catch (err) {
  console.error('Greška pri otvaranju baze:', err.message);
}

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM products'
  const select = db.prepare(sql);
  const products = select.all();
  res.render('admin/products', {
    title: 'Administration',
    products: products
  });
});


module.exports = router;

