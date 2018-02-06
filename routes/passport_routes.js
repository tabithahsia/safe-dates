module.exports = (app, passport) => {
  app.get('/auth/facebook', passport.authenticate('facebook', { 
    scope: ['public_profile']
  }));

  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  );
}