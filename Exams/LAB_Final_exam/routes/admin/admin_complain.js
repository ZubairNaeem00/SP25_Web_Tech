const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin, isUser } = require('../../middleware/user_authentication');
const Complaint = require('../../models/complain');
const User = require('../../models/users')

router.get('/dashboard/complains', isLoggedIn, isAdmin, async (req, res) => {


    activePage = 'complains';
    const complains = await Complaint.find().populate('user').sort({ createdAt: -1 }); 
    res.render('admin/complains', {complains, activePage, layout : 'layouts/dashboard_layout' });
});

router.get('/reply/:id', isAdmin, async (req, res) => {
  const complaintId = req.params.id;

    const complaint = await Complaint.findById(complaintId).populate('user');
    res.render('admin/reply_form', { complaint,  activePage, layout : 'layouts/dashboard_layout'  }); // make this EJS file
  
});

module.exports = router;
