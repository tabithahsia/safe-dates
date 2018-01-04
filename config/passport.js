const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User.js');

module.exports = (passport) => {
  let clientID, clientSecret, callbackURL; 
  if (process.env.MONGODB_URI || process.env.PORT){
    clientID = process.env.facebook_CLIENT_ID;
    clientSecret = process.env.facebook_CLIENT_SECRET;
    callbackURL = process.env.facebook_CALLBACK_URL;
  } else {
    let configAuth = require('./auth.js');
    clientID = configAuth.facebookAuth.clientID;
    clientSecret = configAuth.facebookAuth.clientSecret;
    callbackURL = configAuth.facebookAuth.callbackURL;
  }

	passport.serializeUser(function(user, done){
    // console.log('serializeUser is being called!')
    // console.log('user obj is')
    // console.log(user)
    done(null, user.id);
	});

  passport.deserializeUser(function(id, done){
    // console.log('deserializeUser is being called!')
    User.findById(id, function(err, user){
			done(null, user);
		});
  });

	passport.use(new FacebookStrategy({
	    clientID: clientID,
	    clientSecret: clientSecret,
      callbackURL: callbackURL,
      profileFields:['id', 'displayName', 'photos']
    },
	  function(accessToken, refreshToken, profile, done) {
      // console.log("access", accessToken)
      // console.log("refresh", refreshToken)
      // console.log("profile", profile)
      process.nextTick(function(){
        // console.log('trying to find user')
        // console.log(`profile displayname is ${profile.displayName}`)
        User.findOne({ 'fullName' : profile.displayName}, function(err, user){
          if(user){
            // console.log('user found!')
            return done(null, user);
          }
          else {
            // console.log('creating a new user');
            User.create({
              'fullName' : profile.displayName
            }, function(err, data){
              if (err) {
                console.log(err)
              } else {
                // console.log('done creating a new user')
                console.log(data);
                return done(null, data)
              };
            })  
          }      
        })
      })
    }
	));
};
