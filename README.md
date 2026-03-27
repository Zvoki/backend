# Backend Project

This repository contains a small **Node.js/Express** backend for a product catalogue/web shop prototype. It was originally generated with the Express application generator and expanded with a lightweight SQLite database, EJS views and basic file uploads. The goal of the project is to demonstrate an end‑to‑end backend serving dynamic pages, handling database access, and providing a minimal administration interface for managing products.

## Project structure

backend-projekt/
│
├── data/
│   └── Populera-produkter.db
│
├── routes/
│   ├── index.js
│   ├── users.js
│   ├── product.js
│   └── adminProducts.js
│
├── views/
│   ├── index.ejs
│   ├── product.ejs
│   ├── three-products.ejs
│   ├── administration/
│   │   ├── products.ejs
│   │   └── new-product.ejs
│   └── partials/
│       ├── accordion.ejs
│       └── sma-ikoner.ejs
│
├── public/
│   ├── css/
│   ├── images/
│   └── uploads/
│
├── app.js
└── package.json


## Live Demo

Backend Project URL:
https://backend-ryn4.onrender.com

Admin Panel
(Admin UI built in React – no login required for demo purposes)

All products (admin):
https://backend-ryn4.onrender.com/admin/products

Form for new product:
https://backend-ryn4.onrender.com/admin/products/new

## Admin Routes

Method | Route | Description
GET | /admin/products | Adnmin product list
GET | /admin/products/new | Create a new product
POST | /admin/products/new | Create a new product
GET | /admin/products/:id | Display details of a specific product

## Image Uploads

Uploaded images are stored in:
`public/uploads/`
Accessible via: https://backend-ryn4.onrender.com/uploads/<filename>

Database
The application uses a SQLite database located at:
`data/Populera-produkter.db`
The database contains a `products` table with the following schema:
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  image_url TEXT
);

## Features

- **Express-based server** with middleware for logging, JSON parsing, cookies, and static assets
- **EJS templating** with layout support via `express-ejs-layouts`
- **SQLite3 (better-sqlite3)** database storing product records
- Public routes for:
  - Homepage displaying a hero banner, dynamic spots and a grid of products
  - Product listing (three products on the front page)
  - Individual product detail pages with related items
- Minimal **administration page** stubs prepared for adding/editing products and uploading images using `multer`
- Organized view partials (hero, spots, product grid, icons, accordion, etc.) for reuse
- Static assets (CSS, client-side JavaScript, uploads) served from `public/`

## Responsive Design

The application is fully responsive and optimized for three key screen sizes:
< 640px — Mobile devices
Simplified layout
Vertical stacking of elements
Adjusted typography and spacing for small screens
≥ 640px — Tablets and small laptops
Two‑column layout where appropriate
Larger product images
Improved navigation and spacing
≥ 1024px — Desktop screens
Full‑width layout
Grid‑based product display (e.g., 4×2 products)
Expanded admin panel layout for better usability
Responsiveness is implemented using CSS media queries, flexbox, and grid to ensure a consistent and user‑friendly experience across all devices.

## 🛠️ Tech Stack

| Area | Technology |

| Runtime | Node.js (v16+ recommended) |
| Framework | Express 4.x |
| Templating | EJS with `express-ejs-layouts` |
| Database | SQLite accessed via `better-sqlite3` |
| File uploads | Multer |
| Utilities | Morgan, cookie-parser, http-errors |
| Dev tools | nodemon for automatic restarts |

---

+## 📁 Repository Structure

app.js                  Express  application setup

bin/www                 HTTP server bootstrap

routes/                # Route handlers for public & admin

  index.js

  products.js

  admin/

    products.js        # admin router (db + multer setup)

views/                 # EJS templates and layout

public/                # static assets (CSS, images, uploads)

data/                  # SQLite database file & schema SQL

## 💡 Getting Started

1. **Clone the repository**

   bash

   git clone repo-url
   cd backend-projekt

2. **Install dependencies**

   bash
   npm install

3. **Prepare the database**
   - The project uses `data/Populera-produkter.db`. A sample schema and seed data can be found in `Tebela produkter.sqlite3-query`.
   - You can recreate or modify the database using the `sqlite3` CLI or a GUI client.

4. **Run the development server**

   bash
   npm start

   The app will listen on `http://localhost:3000` by default.

5. **Browse the pages**
   - `http://localhost:3000/` – homepage with product grid
   - `http://localhost:3000/products/<id>` – individual product details
   - `http://localhost:3000/admin/products` – placeholder for admin interface

---

## 🧩 Extending the Project

Here are some ideas if you want to take this prototype further:

- Implement full CRUD operations in the admin router (create, read, update, delete products)
- Add authentication/authorization for admin routes
- Build a RESTful JSON API for consumption by a frontend SPA or mobile app
- Add pagination, search, and filtering to the public product listing
- Migrate from SQLite to a more scalable database (PostgreSQL, MongoDB, etc.)
- Improve error handling and input validation

---

## 📄 License

This project is currently private. Modify or add a license as needed before sharing with third parties.

---

Thanks for checking out the backend prototype! Feel free to explore the code and let me know if you have any questions.
