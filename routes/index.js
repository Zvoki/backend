var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var upload = multer({ dest: path.join(__dirname, '../public/uploads/') });
var Database = require('better-sqlite3');
var db = new Database(path.join('C:/Workspace/npx/backend-projekt/data/Populera-produkter.db'), { verbose: console.log });
//Annan sökväg för databasen;
//var db = new Database(path.join(__dirname, 'data', 'Populera-produkter.db'), { verbose: console.log });
/*
  Nije greška što ste ručno naveli SKU brojeve kao što je "VIT006".
  SKU (Stock Keeping Unit) je identifikator proizvoda i često se ručno određuje prema internim pravilima firme.
  Bitno je samo da su SKU brojevi jedinstveni za svaki proizvod u bazi.
*/

// Redosled polja u kodu i bazi treba da odgovara redosledu iz formulara:
// Namn, Beskrivning, Bild URL, Märke, SKU, Pris (SEK)

// Prilikom unosa u bazu (INSERT INTO products ...), redosled vrednosti treba da bude:
// namn, description, image_url, brand, sku, price

// Proveri da li je redosled u formi i kodu isti:
// 1. Namn         -> namn
// 2. Beskrivning  -> description
// 3. Bild URL     -> image_url
// 4. Märke        -> brand
// 5. SKU          -> sku
// 6. Pris (SEK)   -> price

// U kodu je redosled već ispravan:
// const { namn, description, brand, sku, price } = req.body;
// let image_url = ...;
// stmt.run(namn, description, image_url, brand, sku, price);

// Dakle, redosled polja u kodu odgovara redosledu iz formulara.

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
// Ruta koja se aktivira za GET zahtev na /admin/products

router.get('/admin/products', (req, res) => {
  const sql = 'SELECT namn, sku, price FROM products';
  const select = db.prepare(sql);
  const products = select.all(); // Izvršava SQL upit i dobija sve proizvode
  res.render('administration/products', { layout: false, adminProducts: products });
});
router.get('/new', (req, res) => {
  // Pošto nema potrebe za dohvatom podataka,
  // direktno renderuj odgovarajući view.
  res.render('administration/new-product', { layout: false });
});

// Dodaj rutu za /admin/products/new
router.get('/admin/products/new', (req, res) => {
  res.render('administration/new-product', { layout: false });
});

// POST /admin/products/new – unos novog proizvoda
router.post('/admin/products/new', upload.single('image'), (req, res, next) => {
const { namn ,description, brand, sku, price } = req.body;
const image = req.file ? req.file.filename : null;

// Pripremi image_url za unos u bazu
let image_url = null;
if (image) {
  image_url = '/uploads/' + image;
} else if (req.body.imageUrl) {
  image_url = req.body.imageUrl;
} else if (req.body.image_url) {
  image_url = req.body.image_url;
} else {
  image_url = '';
}

// Debug: log received fields to help diagnose missing data
console.log('Received fields:', { namn, description, brand, sku, price, image });
console.log('Mapped fields:', { namn, description, brand, sku, price, image_url });

if (!namn || !description || !brand || !sku || !price) {
  return res.status(400).send("Alla rader är obligatoriska!");
}

try {
  const stmt = db.prepare(
    'INSERT INTO products (namn, description, image_url, brand, sku, price) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const info = stmt.run(namn, description, image_url, brand, sku, price);
  console.log("Umetnut proizvod, ID:", info.lastInsertRowid);
  
  // Nakon uspešnog unosa, preusmeri na listu proizvoda u administraciji:
  res.redirect('/admin/products');
} catch (err) {
  next(err);
}
});


module.exports = router;