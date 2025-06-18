const express = require('express');
const router = express.Router()
const { isLoggedIn, isAdmin, isUser } = require('../middleware/user_authentication')


router.get('/checkout', isLoggedIn, isUser, (req, res) => {
  const cart = req.session.cart || [];
  let grandTotal = 0;

  cart.forEach(item => {
    grandTotal += item.qty * item.price;
  });

  res.render('checkout', {cart, grandTotal, layout:false});
});

const Order = require('../models/order');

router.post('/place-order', async (req, res) => {

    const {
      email,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      phoneNumber,
      totalPrice
    } = req.body;

    const cart = req.session.cart;

    const orderProducts = cart.map(item => ({
      name: item.name,
      qty: item.qty,
      price: item.price,
      image: item.image
    }));

    const newOrder = new Order({
      user: req.session.userId,
      userName: `${firstName} ${lastName}`,
      email,
      address: `${address}, ${city}${postalCode ? ', ' + postalCode : ''}`,
      phoneNumber,
      products: orderProducts,
      totalPrice: parseFloat(totalPrice)
    });

    await newOrder.save();
    console.log("✅ Order saved:", newOrder);

    req.session.cart = [];

    res.redirect('/order-success'); 
 
});

router.get('/order-success', (req, res) => {

  res.render('ordersuccess', { layout:false});
});

module.exports = router