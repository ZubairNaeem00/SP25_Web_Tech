function isLoggedIn(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/user/login');
  }
}

function isAdmin(req, res, next) {
  if (req.session.role === 'admin') return next();
  res.status(403).send('Access Denied');
}

function isUser(req, res, next) {
  if (req.session.role === 'user') return next();
  res.status(403).send('Access Denied');
}

module.exports = { isLoggedIn, isAdmin, isUser };
