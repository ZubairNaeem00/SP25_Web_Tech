const express = require('express');
const session = require('express-session');
const router = express.Router()
const Product = require('../../models/product');

router.get('/product/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('product', { product });
});

router.post('/add-to-cart/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!req.session.cart) req.session.cart = [];

  const existing = req.session.cart.find(p => p._id == productId);
  if (existing) {
    existing.qty += 1;
  } else {
    req.session.cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.product_image,
      qty: 1
    });
  }

  res.json({ success: true, cart: req.session.cart });
});

router.get('/cart/data', (req, res) => {
  res.json({ success: true, cart: req.session.cart || [] });
});

module.exports = router