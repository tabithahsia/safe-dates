var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var logger = require("morgan");
mongoose.Promise = Promise;

var router = express.Router();

//express server
var app = express();
var port = process.env.PORT || 3000;

//server middle-wares
app.use(express.static("./public"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//passport logic
// require('./config/passport.js')(passport);

// app.use(cookieParser('b3saf3'))
// app.use(cookieSession({
//   secret: 'b3saf3',
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }
// }))
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

var User = require('./models/User.js');
if (process.env.MONGODB_URI || process.env.NODE_ENV === 'production') mongoose.connect(process.env.MONGODB_URI);
else mongoose.connect("mongodb://localhost/safeDatesDB");
var db = mongoose.connection;

db.on('error', function(error) {
  console.log('Mongoose Error: ', error);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

//every other page goes to our index page
app.get('*', function (request, response){
  console.log('showing index page!');
  response.redirect('/');
})

//================================


app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});

//helper function to check if user is logged in
function isLoggedIn(req, res) {
    if (req.isAuthenticated()){
      console.log('----user is logged in----');
      return true;
    } else {
      console.log('----user is not logged in----');
      return false
    }
}