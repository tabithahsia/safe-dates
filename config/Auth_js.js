const URL = 'http://localhost:7233/auth/facebook/callback'

module.exports = {
  'facebookAuth': {
    'clientID': '376014406180148',
    'clientSecret': 'a9b984f6c72b54bf31c2dae019187fd6',
    'callbackURL': URL,
    'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields': ['id', 'email', 'name']
  }, 
  'twilio': {
    accountSid: 'AC21617f2a3aa221f4ab07b61c1aa610d9',
    authToken: '64841307c41d15366f1910f56856d54b', 
    twilioNumber: '5103744057',
  }
}