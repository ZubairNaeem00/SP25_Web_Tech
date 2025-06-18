const express = require('express');
const session = require('express-session');
const router = express.Router()
const Product = require('../models/product');

router.get('/', async (req, res) => {
  const products = await Product.find().limit(8);
  const tshirtProducts = await Product.find({ category: 'T-shirts' }).limit(4);
  res.render('index', {products, tshirtProducts});
})

module.exports = router