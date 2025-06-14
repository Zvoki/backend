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

  // Define dynamicSpotsData
  const dynamicSpotsData = [
    
{ 
      title: 'Spot 1', 
      description: 'Spot beskrivning 1',
      image: '/images/110x50.svg',
      link: '/spot1'
    },
    { 
      title: 'Spot 2', 
      description: 'Spot beskrivning 2',
      image: '/images/110x50.svg',
      link: '/spot2'
    },
    { 
      title: 'Spot 3', 
      description: 'Spot beskrivning 3',
      image: '/images/110x50.svg',
      link: '/spot3'
    },

    // Add more data as needed
  ];

  res.render('index', {
    title: 'Freaky Fashion',
    products: products,
    dynamicSpotsData: dynamicSpotsData
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
// Removed duplicate '/' route handler that only rendered dynamicSpotsData
  const dynamicSpotsData = [
    { title: 'Spot 1', description: 'Spot beskrivning 1' },
    { title: 'Spot 2', description: 'Spot beskrivning 2' },
    // Dodaj još podataka kako ti odgovara
  ];

  // Prosleđujemo dynamicSpotsData za index.ejs
  res.render('index', { dynamicSpotsData: dynamicSpotsData });
});

module.exports = router;