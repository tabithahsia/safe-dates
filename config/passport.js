const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User.js');
const configAuth = process.env.PORT ? null : require('./Auth.config');


module.exports = passport => {
  let clientID;
  let clientSecret;
  let callbackURL;
  if (process.env.PORT) {
    ({ clientID, clientSecret, callbackURL } = process.env);
  } else {
    ({ clientID, clientSecret, callbackURL } = configAuth.facebookAuth);
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
    profileFields: ['displayName', 'photos', 'gender', 'age_range', 'birthday'],
    clientID,
    clientSecret,
    callbackURL,
  }, (accessToken, refreshToken, profile, done) => {
    // console.log("access", accessToken)
    // console.log("refresh", refreshToken)
    console.log("profile", profile)
    process.nextTick(() => {
      // console.log('trying to find user')
      // console.log(`profile displayname is ${profile.displayName}`)
      User.findOne({ fullName: profile.displayName }, (err, user) => {
        if (user) {
          // console.log('user found!')
          return done(null, user);
        }
        // console.log('creating a new user');
        User.create({ fullName: profile.displayName, }, (err2, data) => {
          if (err2) {
            // console.log(err2);
            return null;
          }
          // console.log('done creating a new user')
          // console.log(data);
          return done(null, data);
        });
        return null;
      });
    });
  }));
};
