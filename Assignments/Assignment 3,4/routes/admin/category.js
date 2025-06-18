const express = require('express')
const router = express.Router()
let Category = require("../../models/category");
const Product = require('../../models/product');
const { isLoggedIn, isAdmin, isUser } = require('../../middleware/user_authentication');

router.get('/dashboard/category',isLoggedIn, isAdmin, async (req, res) => {
    const categories = await Category.find();
    activePage = 'category';

    const categoriesWithCounts = await Promise.all(
      categories.map(async (cat) => {
        const productCount = await Product.countDocuments({ category: cat.name });
        return {
          _id: cat._id,
          name: cat.name,
          totalProducts: productCount
        };
      })
    );

    res.render('admin/category', { categories: categoriesWithCounts, activePage, layout : 'layouts/dashboard_layout' });
});


router.get('/dashboard/create-category',isLoggedIn, isAdmin, async (req, res) => {
  activePage = 'category';
  res.render('admin/newCategory', { activePage,  layout : 'layouts/dashboard_layout' });
})

router.post("/dashboard/create-category", async (req, res) => {
  let data = req.body;
  let c = new Category();
  c.name = data.name;
  c.description = data.description;
  await c.save();
  return res.redirect("/admin/dashboard/category");
});

router.get('/dashboard/category/edit/:id', async (req, res) => {

    const category = await Category.findById(req.params.id);
    res.render('admin/edit_category', { category, layout: 'layouts/dashboard_layout' });
  
});


router.post('/dashboard/category/edit/:id', async (req, res) => {
 
    const { name, description } = req.body;
    await Category.findByIdAndUpdate(req.params.id, { name, description });
    res.redirect('/admin/dashboard/category');
});

router.get('/dashboard/category/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard/category');
});


module.exports = router
