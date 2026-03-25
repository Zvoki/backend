var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var upload = multer({ dest: path.join(__dirname, '../public/uploads/') });
var Database = require('better-sqlite3');

const dbPath = path.join('./data/Populera-produkter.db');

const db = new Database(dbPath, { verbose: console.log });

//var db = new Database(path.join('C:/Workspace/npx/backend-projekt/data/Populera-produkter.db'), { verbose: console.log });
// Define dynamicSpotsData
  const dynamicSpotsData = [

    {
      title: 'Spot 1',
      slug: 'spot1',
      description: 'Spot beskrivning 1',
      image: '/images/110x50.svg',
      link: '/spot1'
    },
    {
      title: 'Spot 2',
      slug: 'spot2',
      description: 'Spot beskrivning 2',
      image: '/images/110x50.svg',
      link: '/spot2'
    },
    {
      title: 'Spot 3',
      slug: 'spot3',
      description: 'Spot beskrivning 3',
      image: '/images/110x50.svg',
      link: '/spot3'
    },

  ];


/**
 * Helper middleware for error handling.
 * Ovo middleware hvata SQL greške i šalje korisniku poruku.
 */
router.use((err, req, res, next) => {
  if (err && err.code === 'SQLITE_ERROR') {
    console.error('SQLITE_ERROR:', err.message);
    return res.status(500).send('Fel med databas: ' + err.message);
  }
  next(err);
});
router.get('/products/:id', (req, res) => {
  const template = req.isMobile
    ? 'product-mobile'
    : 'product-desktop';
  res.render(template, {
    id: req.params.id,
    title: `Svart T-Shirt ${req.params.id}`
  });
});

// routes/index.js

router.get('/spot1', (req, res) => {
  const spot = dynamicSpotsData.find(s => s.slug === 'spot1');
  res.render('spot-detail', { spot, title: spot.name || 'Spot 1' });
});

router.get('/spot2', (req, res) => {
  const spot = dynamicSpotsData.find(s => s.slug === 'spot2');
  res.render('spot-detail', { spot, title: spot.name || 'Spot 2' });
});

router.get('/spot3', (req, res) => {
  const spot = dynamicSpotsData.find(s => s.slug === 'spot3');
  res.render('spot-detail', { spot, title: spot.name || 'Spot 3' });
});




router.get('/', (req, res) => {
  const sql = 'SELECT * FROM products';
  const select = db.prepare(sql);
  const products = select.all();

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

  
  // Prosleđujemo dynamicSpotsData za index.ejs
  res.render('index', {
    title: 'Freaky Fashion',
    products: products,
    dynamicSpotsData: dynamicSpotsData
  });
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
  const { namn, description, brand, sku, price } = req.body;
  console.log(namn, description, brand, sku, price);//Ovo sam sam dodao.
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
    console.log("Lagd produkt, ID:", info.lastInsertRowid);

    // Nakon uspešnog unosa, preusmeri na listu proizvoda u administraciji:
    res.redirect('/admin/products');
  } catch (err) {
    next(err);
  }
});



module.exports = router;