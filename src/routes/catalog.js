// // src\routes\catalog.js
const express = require('express');
const { verifyJWT } = require('../middleware/auth');
const { getProducts } = require('../services/productService');

const router = express.Router();

router.get('/catalog', verifyJWT, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 20;

    const { products, totalPages } = await getProducts(page, perPage);

    res.render('catalog', {
      products,
      page,
      totalPages,
      token: req.token,
      hookUrl: req.sessionData.hookUrl
    });
  } catch (err) {
    console.error('Error loading catalog:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
