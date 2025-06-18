const express = require('express');
const router = express.Router();
const Product = require('../models/product');


router.get('/all', async (req, res) => {

    const products = await Product.find({});
    res.render('products', { products});
  
});


router.get('/tshirts', async (req, res) => {

    const products = await Product.find({ category: 'T-shirts' });
    res.render('products', { products});
  
});

router.get('/jackets', async (req, res) => {

    const products = await Product.find({ category: 'Jackets' });
    res.render('products', { products});
  
});

router.get('/shirts', async (req, res) => {

    const products = await Product.find({ category: 'Shirts' });
    res.render('products', { products });
  
});

router.get('/shorts', async (req, res) => {

    const products = await Product.find({ category: 'Shorts' });
    res.render('products', { products });
  
});

router.get('/trousers', async (req, res) => {

    const products = await Product.find({ category: 'Trousers' });
    res.render('products', { products });
  
});

module.exports = router