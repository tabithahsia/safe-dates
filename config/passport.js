var GoogleStrategy = require('passport-facebook').OAuth2Strategy;
var User = require('../models/User.js');

var passport = function(passport) {
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
  
  if (process.env.MONGODB_URI || process.env.PORT){
    var clientID = process.env.facebook_CLIENT_ID;
    var clientSecret = process.env.facebook_CLIENT_SECRET;
    var callbackURL = process.env.facebook_CALLBACK_URL;
  } else {
    var configAuth = require('./auth.js');
    var clientID = configAuth.facebookAuth.clientID;
	  var clientSecret = configAuth.facebookAuth.clientSecret;
	  var callbackURL = configAuth.facebookAuth.callbackURL;

  }

  console.log(process.env.facebook_CLIENT_ID, 'CLIENT ID IN PASSPORT')

	passport.use(new FacebookStrategy({
	    clientID: clientID,
	    clientSecret: clientSecret,
	    callbackURL: callbackURL
    },
	  function(accessToken, refreshToken, profile, done) {
      // console.log("access", accessToken)
      // console.log("refresh", refreshToken)
      // console.log("profile", profile)
      process.nextTick(function(){
        console.log('trying to find user')
        // console.log(`profile displayname is ${profile.displayName}`)
        User.findOne({'username': profile.displayName}, function(err, user){
          if(user){
            console.log('user found!')
            return done(null, user);
          }
          else {
            console.log('creating a new user');
            User.create({
              'username' : profile.displayName,
            }, function(err, data){
              if (err) {
                console.log(err)
              } else {
                console.log('done creating a new user')
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


module.exports = passport; 