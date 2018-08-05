const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

// express server
const app = express();
const port = process.env.PORT || 7233;
// const router = express.Router();

// server middle-wares
app.use(express.static('./public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser('b3saf3'));
app.use(cookieSession({
  secret: 'b3saf3',
  cookie: { maxAge: 24 * 60 * 60 * 1000 /* 24 hours */ }
}));

// passport logic
require('../config/passport.js')(passport);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// MongoDB logic
mongoose.Promise = Promise;
if (process.env.MONGODB_URI || process.env.NODE_ENV === 'production') mongoose.connect(process.env.MONGODB_URI);
else mongoose.connect('mongodb://localhost/safeDatesDB');
mongoose.connection.on('error', error => console.log('Mongoose Error: ', error));
mongoose.connection.once('open', () => console.log('Mongoose connection successful.'));

// Twilio interval logic
require('./twilio_interval.js')();

// Twilio routes
require('./routes/twilio_routes.js')(app);

// Passport routes
require('./routes/passport_routes.js')(app, passport);

// API routes
require('./routes/API_routes.js')(app);

// every other route goes to our index page
app.get('*', (req, res) => {
  res.redirect('/');
});

// Server starting message
app.listen(port);
