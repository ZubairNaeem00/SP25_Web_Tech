const express = require('express');
const router = express.Router();
const Order = require('../../models/order');
const { isLoggedIn, isAdmin } = require('../../middleware/user_authentication');

router.get('/dashboard/orders',isLoggedIn, isAdmin, async (req, res) => {

    const totalOrders = await Order.countDocuments();
    activePage = 'orders';
    const orders = await Order.find().sort({ createdAt: -1 }); 
    res.render('admin/orders', { totalOrders , orders, activePage, layout : 'layouts/dashboard_layout' });
  
});


router.get('/dashboard/order/status/:id',isLoggedIn, isAdmin, async (req, res) => {
  activePage = 'orders';
  const order = await Order.findById(req.params.id);
  res.render('admin/orderdetails', { order,activePage, layout: 'layouts/dashboard_layout' });
});

router.post('/orders/:id/status',isLoggedIn, isAdmin, async (req, res) => {

  const { status } = req.body;
  await Order.findByIdAndUpdate(req.params.id, { status });
  res.redirect('/admin/dashboard/orders'); 
});


module.exports = router;
