const express = require('express');
const { getProducts } = require('../services/productService');
const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const products = await getProducts(limit);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
