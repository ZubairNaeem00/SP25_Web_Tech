const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');

let Users = require("../models/users");
const Order = require('../models/order'); 
const { isLoggedIn, isAdmin } = require('../middleware/user_authentication');

router.get('/register', async (req, res) => {
  res.render('newform')
})

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const existingUser = await Users.findOne({ email });

  if (existingUser) {
      return res.render('newform', {
                error: 'User already exists'});
    }

  let u = new Users();
  u.name = name;
  u.email = email;
  u.password = hashedPassword;


  await u.save();
  return res.redirect("/user/login");
});

router.get('/login', async (req, res) => {
  res.render('login')
})

router.post('/login', async (req, res) => {
  
  let data = req.body;
  let email = data.email;
  let password = data.password;
   
    const user = await Users.findOne({ email });
    if (!user) {     
      return res.render('login', {
                error: 'Invalid email or password'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render('login', {
                error: 'Invalid email or password'});
    }
    
    req.session.userId = user._id;
    req.session.role = user.role;
    res.redirect('/');
  
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/user/login');
  });
});

router.get('/account', isLoggedIn, async (req, res) => {
  const userId = req.session.userId;

  // Safety check
  if (!userId) {
    return res.redirect('/login'); // or show error
  }

  console.log(userId)
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

  console.log('Fetched Orders:', orders);
  res.render('my_account', { orders });
});





module.exports = router
