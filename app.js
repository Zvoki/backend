var createError = require('http-errors');               // Skapar HTTP-felobjekt för felhantering
var express = require('express');                       // Importerar Express-ramverket
var path = require('path');                             // Hanterar fil- och katalogvägar
var cookieParser = require('cookie-parser');            // Parserar cookies i inkommande förfrågningar
var logger = require('morgan');                         // Loggar HTTP-förfrågningar

var indexRouter = require('./routes/index');             // Router för startsidan
var usersRouter = require('./routes/users');             // Router för användarhantering
var productsRouter = require('./routes/products');       // Router för produktendpoints
var adminProductsRouter = require('./routes/admin/products'); // Router för admin-produkter
const expressEjsLayouts = require('express-ejs-layouts'); // Middleware för EJS-layouts
const { exit } = require('process');                     // Ger möjlighet att avsluta Node-processen

var app = express();

app.use((req, res, next) => {
  res.set('Accept-CH', 'Viewport-Width');
  res.set('Vary', 'Viewport-Width');
  next();
});                                   // Skapar Express-applikationen

app.use(expressEjsLayouts);                             // Aktiverar EJS-layouts middleware

// view engine setup
app.set('views', path.join(__dirname, 'views'));        // Anger katalogen för vyfiler
app.set('view engine', 'ejs');                          // Sätter EJS som vy-motor
app.set('layout', 'layouts/public');                    // Väljer standardlayout för alla vyer
//app.use används för att konfigurera middleware i Express
app.use(logger('dev'));                                 // Använder Morgan i utvecklingsläge för loggning
app.use(express.json());                                // Tolkar JSON i inkommande request-body
app.use(express.urlencoded({ extended: false }));       // Tolkar URL-kodade formulärdata
app.use(cookieParser());                                // Parserar cookies i requesten
app.use(express.static(path.join(__dirname, 'public'))); // Serverar statiska filer från public-mappen

app.use('/', indexRouter);                              // Mountar indexRouter på rotvägen
app.use('/users', usersRouter);                         // Mountar usersRouter på /users
app.use('/products', productsRouter);                   // Mountar productsRouter på /products
app.use('/admin/products', adminProductsRouter);        // Mountar adminProductsRouter på /admin/products

// Hantera 404 och skicka vidare till felhanteraren
app.use(function(req, res, next) {
  next(createError(404));                               // Skapar och skickar ett 404-fel vidare
});

// Felhanterare
app.use(function(err, req, res, next) {
  res.locals.message = err.message;                     // Gör felmeddelandet tillgängligt i vyn
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Visa felinfo endast i utveckling

  res.status(err.status || 500);                        // Anger HTTP-statuskod
  res.render('error', { layout: false });               // Renderar felvyn utan layout
});

module.exports = app;                                   // Exporterar app-objektet för användning i www.js
