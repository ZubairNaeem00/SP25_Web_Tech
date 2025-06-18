const express = require('express')
const router = express.Router()
let Category = require("../../models/category");
let Product = require("../../models/product");
const { isLoggedIn, isAdmin, isUser } = require('../../middleware/user_authentication');


router.get('/dashboard/products',isLoggedIn, isAdmin, async (req, res) => {

  const totalProducts = await Product.countDocuments();
  activePage = 'products';
  let products = await Product.find();
  res.render('admin/products.ejs', { activePage, products ,totalProducts , layout : 'layouts/dashboard_layout'});
});

router.get('/dashboard/create-product',isLoggedIn, isAdmin, async (req, res) => {
  const categories = await Category.find({});
  activePage = 'products';
  res.render('admin/newProduct', {  activePage, categories, layout : 'layouts/dashboard_layout' });
})

router.post('/dashboard/create-product', async (req, res) => {
  let data = req.body;
  let p = new Product();
  p.name = data.name;
  p.product_image = data.product_image;
  p.description = data.description;
  p.category = data.category;
  p.price = data.price;
  p.product_status = data.product_status;
  p.sku = data.sku;
  await p.save();
  return res.redirect("/admin/dashboard/products");
})

router.get('/dashboard/product/edit/:id',isLoggedIn, isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.redirect('/admin/dashboard/products');
  const categories = await Category.find({});
  activePage = 'products';
  res.render('admin/editproduct', { categories, activePage, product, layout : 'layouts/dashboard_layout' }); 
});

router.post('/dashboard/product/edit/:id', async (req, res) => {
  let data = req.body;

  try {
    await Product.findByIdAndUpdate(req.params.id, {
      name: data.name,
      product_image: data.product_image,
      description: data.description,
      category: data.category,
      price: data.price,
      product_status: data.product_status,
      sku: data.sku
    });

    res.redirect("/admin/dashboard/products");
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send("Error updating product");
  }
});

router.get('/dashboard/product/delete/:id',isLoggedIn, isAdmin, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard/products');
});


module.exports = router;