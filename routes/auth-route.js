const router = require('express').Router();
const passport = require('passport');

router.get('/login/success', (req, res) => {
  console.log('getting user')
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/login', passport.authenticate('github'))

router.get(
  '/login/redirect',
  passport.authenticate('github', {
    failureRedirect: '/auth/login/failed',
  }),
  (req, res) => {
    res.redirect('/')
  }
);

module.exports = router;
