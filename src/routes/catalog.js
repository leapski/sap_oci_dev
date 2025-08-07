// src\routes\catalog.js
const express = require('express');
const { verifyJWT } = require('../middleware/auth');
const { getProducts } = require('../services/productService');

const router = express.Router();

router.get('/catalog', verifyJWT, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 5;

  const products = await getProducts();
  const totalPages = Math.ceil(products.length / perPage);
  const paginated = products.slice((page - 1) * perPage, page * perPage);
  res.render('catalog', {
    products: paginated,
    page,
    totalPages,
    token: req.token,
    hookUrl: req.sessionData.hookUrl
  });
});

module.exports = router; 