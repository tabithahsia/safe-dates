const User = require('../models/User.js');

//helper function to check if user is logged in
const isLoggedIn = (req, res) => {
  if (req.isAuthenticated()){
    console.log('----user is logged in----');
    return true;
  } else {
    console.log('----user is not logged in----');
    return false
  }
}

module.exports = (app) => {
  app.get('/api/user',(req, res) => {
    var userToFind = '';  
    // console.log('req session is', req.session)
    if (req.session.passport) userToFind =  req.session.passport.user;
    User.findById(userToFind, (err, foundUser) => {
      // console.log('foundUser', foundUser);
      // if (!foundUser) foundUser = {};
      res.json(foundUser)
    })
  })
  
  //route for server to respond if user is logged in
  app.get("/api/loggedin", (req, res) => {
    console.log(`is user logged in? ${isLoggedIn(req, res)}`)
    res.json({
      logged: isLoggedIn(req,res)
    })
  })
  
  app.post("/api/date", (req, res) => {
    User.findOneAndUpdate({
      _id: req.session.passport.user,
    }, req.body).then((dont_matter, err) => {
      if (err) res.json(false)
      else res.json(true)
    })
  })
  
  app.put("/api/user", (req, res) => {
    // console.log(req.body)
    User.findOneAndUpdate({
      _id: req.session.passport.user,
    }, req.body).then((dont_matter, err) => {
      if (err) res.json(false)
      else res.json(true)
    })
  })
}