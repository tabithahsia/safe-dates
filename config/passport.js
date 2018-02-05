const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User.js');

module.exports = passport => {
  let clientID, clientSecret, callbackURL;
  if (process.env.MONGODB_URI || process.env.PORT) {
    clientID = process.env.facebook_CLIENT_ID;
    clientSecret = process.env.facebook_CLIENT_SECRET;
    callbackURL = process.env.facebook_CALLBACK_URL;
  } else {
    const configAuth = require('./auth.js');
    [clientID, clientSecret, callbackURL] = configAuth.facebookAuth;
  }

  passport.serializeUser((user, done) => {
    // console.log('serializeUser is being called!')
    // console.log('user obj is')
    // console.log(user)
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // console.log('deserializeUser is being called!')
    User.findById(id, (err, user) => {
      done(null, user);
    });
  });

  passport.use(new FacebookStrategy({
    profileFields: ['id', 'displayName', 'photos'],
    clientID,
    clientSecret,
    callbackURL,
  }, (accessToken, refreshToken, profile, done) => {
    // console.log("access", accessToken)
    // console.log("refresh", refreshToken)
    // console.log("profile", profile)
    process.nextTick(() => {
      // console.log('trying to find user')
      // console.log(`profile displayname is ${profile.displayName}`)
      User.findOne({ 'fullName': profile.displayName }, (err, user) => {
        if (user) {
          // console.log('user found!')
          return done(null, user);
        } else {
          // console.log('creating a new user');
          User.create({
            'fullName': profile.displayName
          }, (err2, data) => {
            if (err2) {
              console.log(err2);
              return null;
            } else {
              // console.log('done creating a new user')
              // console.log(data);
              return done(null, data);
            }
          });
          return null;
        }
      });
    });
  }));
};
