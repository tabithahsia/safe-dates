var URL = "";
if (process.env.PORT) URL = '';
else URL = "http://localhost:3000/auth/facebook/callback"

module.exports = {
	'facebookAuth' : {
		'clientID': '',
		'clientSecret': '',
		'callbackURL': URL
	}
}
