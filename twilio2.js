const twilioKeys = require("./config/auth.js").twilio;
const accountSid = twilioKeys.accountSid;
const authToken = twilioKeys.authToken;
const client = require('twilio')(accountSid, authToken);
var User = require('./models/User.js');


var twilioFunc = ()=>{
  var today = new Date();
  var todayDate = today.getDate()
  User.findOne({
    date: `${today.getFullYear()}-${today.getMonth()+1}-${todayDate.length === 1 ? '0' + todayDate : todayDate}`,
    time: `${today.getHours()}:${today.getMinutes()}`
  }).then(result=>{
    if (result){
      console.log("result is", result)
      client.calls.create({
  url: "http://demo.twilio.com/docs/voice.xml",
  to: result.locationNumber,
  from: '+15103744057',
}, function(err, call) {
  if(err) {
    console.log(err);
  } else {
    console.log(call.sid);
  }
})
.then((call) => process.stdout.write(call.sid));
    }
  })
}

var intervalTwilio = function(){setInterval(twilioFunc, 30000)}
module.exports=intervalTwilio; 