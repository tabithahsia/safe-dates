module.exports = (app, passport) => {
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'user_birthday', 'user_age_range', 'user_gender'] }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
