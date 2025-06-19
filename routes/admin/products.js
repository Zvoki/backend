const express = require('express');
const router = express.Router();
const path = require('path');
const Database = require('better-sqlite3');
const multer = require('multer');

// Konfiguracija multer-a za obradu uploadovanih fajlova
const upload = multer({
  dest: path.join(__dirname, '../public/uploads') // Folder za čuvanje slika
});

// Ispravna putanja s dvostrukim backslash-evima
const dbPath = path.join('C:/Workspace/npx/backend-projekt/data/Populera-produkter.db');
let db;
try {
  db = new Database(dbPath, { verbose: console.log });
  console.log('Kopplad med databas' + dbPath);
} catch (err) {
  console.error('Fel med databas:', err.message);
}


module.exports = router;

