const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin, isUser } = require('../middleware/user_authentication');
const Order = require('../models/order'); 
const Complaint = require('../models/complain');


router.get('/complain', isLoggedIn, isUser, async (req, res) => {
  const orders = await Order.find({ user: req.session.userId });
  res.render('new_complain', { orders });
});

router.post('/complain', isLoggedIn, isUser, async (req, res) => {
  const { type, message } = req.body;
  let orderId = req.body.orderId; // define with let so you can reassign

  if (type !== 'order') {
    orderId = null;
  }

  const complain = new Complaint({
    user: req.session.userId, // make sure userId exists in session
    orderId: orderId,
    message: message,
    createdAt: new Date(),
  });

  await complain.save();
  res.redirect('/');
});

router.get('/my-complains', isLoggedIn, async (req, res) => {
  const userId = req.session.userId;


  if (!userId) {
    return res.redirect('/login'); 
  }

  console.log(userId)
  const complains = await Complaint.find({ user: userId }).sort({ createdAt: -1 });

  res.render('my_complaints', { complains });
});


module.exports = router;
