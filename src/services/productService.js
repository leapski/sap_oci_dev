// src\services\productService.js
const Product = require('../models/Product');

async function getProducts(page = 1, perPage = 20) {
  const offset = (page - 1) * perPage;
  const { rows, count } = await Product.findAndCountAll({
    order: [['id', 'ASC']],
    limit: perPage,
    offset
  });

  return {
    products: rows,
    totalPages: Math.ceil(count / perPage),
  };
}

module.exports = { getProducts };