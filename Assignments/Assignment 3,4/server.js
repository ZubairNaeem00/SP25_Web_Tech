let express = require("express");
let mongoose = require("mongoose");
const session = require('express-session');

const app = express();

app.use(express.static("public"));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.cart = req.session.cart || [];
  next();
});

const expressLayouts = require('express-ejs-layouts')

app.set("view engine", "ejs");
app.set('layout', 'layouts/head_foot');

const indexRouter = require('./routes/albam')
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/admin/products')
const admincategoryroutes = require('./routes/admin/category')
const admindashroutes = require('./routes/admin/dashboard')
const productroutes = require('./routes/product_routes/products')
const checkoutroutes = require('./routes/checkout')
const orderRoutes = require('./routes/admin/orders')
const cartRouter = require('./routes/cart')
const collectionRouter = require('./routes/collection')
const usercompRouter = require('./routes/user_complain')
const admincompRouter = require('./routes/admin/admin_complain')

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin', productsRouter);
app.use('/admin', admincategoryroutes);
app.use('/admin', admindashroutes);
app.use('/admin', admincompRouter);
app.use('/', productroutes);
app.use('/', checkoutroutes);
app.use('/admin', orderRoutes);
app.use('/', cartRouter);
app.use('/collection', collectionRouter);
app.use('/user', usercompRouter);

mongoose.connect("mongodb://localhost:27017/Albam").then(() => {
  console.log("connected to db");
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});