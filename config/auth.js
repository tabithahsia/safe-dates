var URL = "";
if (process.env.PORT) URL = '';
else URL = "http://localhost:3000/auth/facebook/callback"

module.exports = {
	'facebookAuth' : {
		'clientID': '376014406180148',
		'clientSecret': 'a9b984f6c72b54bf31c2dae019187fd6',
		'callbackURL': URL
	}
}
