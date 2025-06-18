const express = require('express')
const router = express.Router()
const Users = require('../../models/users');
const Products = require('../../models/product')
const { isLoggedIn, isAdmin, isUser } = require('../../middleware/user_authentication');
const moment = require('moment')

router.get('/dashboard', isLoggedIn, isAdmin, async (req, res) => {
  activePage = 'dashboard';
  const totalUsers = await Users.countDocuments();
  console.log(req.session.role)

  const totalProducts = await Products.countDocuments();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentUsers = await Users.countDocuments({ registeredAt: { $gte: sevenDaysAgo } });

  const labels = [];
  const data = [];

  for (let i = 14; i >= 0; i--) {
    const day = moment().subtract(i, "days");
    const start = day.startOf("day").toDate();
    const end = day.endOf("day").toDate();

    const count = await Users.countDocuments({
      registeredAt: { $gte: start, $lte: end }
    });

    labels.push(day.format("DD MMM"));
    data.push(count);
  }

  res.render("admin/dashboard", {  totalUsers,data, labels, recentUsers ,activePage, totalProducts,  layout : 'layouts/dashboard_layout' });
});

module.exports = router