const express = require('express');
const router = express.Router()

const Product = require('../models/product'); // adjust path

router.post('/add-to-cart/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    let cart = req.session.cart || [];

    const existingIndex = cart.findIndex(p => p._id === productId);
    if (existingIndex !== -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        _id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1
      });
    }

    req.session.cart = cart;

    return res.json({ success: true, cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

router.get('/cart/data', (req, res) => {
  const cart = req.session.cart || [];
  return res.json({ success: true, cart });
});

router.post('/cart/update/:id', (req, res) => {
  const { qty } = req.body;
  const id = req.params.id;

  let cart = req.session.cart || [];

  const index = cart.findIndex(item => item._id === id);
  if (index !== -1) {
    cart[index].qty = parseInt(qty) || 1;
    req.session.cart = cart;
  }

  return res.json({ success: true, cart });
});

router.delete('/cart/remove/:id', (req, res) => {
  const id = req.params.id;
  let cart = req.session.cart || [];

  cart = cart.filter(item => item._id !== id);
  req.session.cart = cart;

  return res.json({ success: true, cart });
});

module.exports = router