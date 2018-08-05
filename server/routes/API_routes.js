const User = require('../../models/User.js');

// helper function to check if user is logged in
const isLoggedIn = req => {
  if (req.isAuthenticated()) {
    // console.log('----user is logged in----');
    return true;
  }
  // console.log('----user is not logged in----');
  return false;
}

module.exports = app => {
  app.get('/api/user', (req, res) => {
    let userToFind = '';
    // console.log('req session is', req.session)
    if (req.session.passport) userToFind = req.session.passport.user;
    User.findById(userToFind, (err, foundUser) => {
      // console.log('foundUser', foundUser);
      // if (!foundUser) foundUser = {};
      res.json(foundUser);
    });
  });

  // route for server to respond if user is logged in
  app.get('/api/loggedin', (req, res) => {
    // console.log(`is user logged in? ${isLoggedIn(req, res)}`);
    res.json({ logged: isLoggedIn(req, res) });
  });

  app.post('/api/date', (req, res) => {
    // console.log(req.body);
    User.findOneAndUpdate({ _id: req.session.passport.user }, {
      UTCdateTime: req.body.m.slice(0, -8),
      location: req.body.location,
      locationNumber: req.body.locationNumber
    }).then((data, err) => {
      if (err) res.json(false);
      else res.json(true);
    });
  });

  app.put('/api/user', (req, res) => {
    // console.log(req.body)
    User.findOneAndUpdate({ _id: req.session.passport.user }, req.body)
      .then((data, err) => {
        if (err) res.json(false);
        else res.json(true);
      });
  });
};
