// src\services\productService.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'products.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      price REAL,
      currency TEXT,
      partNumber TEXT,
      vendor TEXT
    )
  `);
});

const products = [
  { id: 1, name: 'Product A', price: 10.99, currency: 'USD', partNumber: 'A001', vendor: 'VendorX' },
  { id: 2, name: 'Product B', price: 12.49, currency: 'USD', partNumber: 'B002', vendor: 'VendorX' },
  { id: 3, name: 'Product C', price: 8.75, currency: 'USD', partNumber: 'C003', vendor: 'VendorY' },
  { id: 4, name: 'Product D', price: 15.00, currency: 'USD', partNumber: 'D004', vendor: 'VendorY' },
  { id: 5, name: 'Product E', price: 9.99, currency: 'USD', partNumber: 'E005', vendor: 'VendorZ' },
  { id: 6, name: 'Product F', price: 11.25, currency: 'USD', partNumber: 'F006', vendor: 'VendorZ' },
  { id: 7, name: 'Product G', price: 13.50, currency: 'USD', partNumber: 'G007', vendor: 'VendorX' },
];

function seedProducts() {
  db.serialize(() => {
    db.all(`SELECT COUNT(*) as count FROM products`, (err, rows) => {
      if (err) {
        console.error('Failed to count products:', err);
        return;
      }

      if (rows[0].count === 0) {
        const stmt = db.prepare(`
          INSERT INTO products (id, name, price, currency, partNumber, vendor)
          VALUES (?, ?, ?, ?, ?, ?)
        `);
        products.forEach(p => {
          stmt.run(p.id, p.name, p.price, p.currency, p.partNumber, p.vendor);
        });
        stmt.finalize();
        console.log('Products seeded successfully.');
      } else {
        console.log('Products already exist. Skipping seed.');
      }
    });
  });
}

function getProducts() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products`, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = {
  seedProducts,
  getProducts,
};
