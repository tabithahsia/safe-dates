const accountSid = 'AC21617f2a3aa221f4ab07b61c1aa610d9';
const authToken = '64841307c41d15366f1910f56856d54b';
const client = require('twilio')(accountSid, authToken);
var User = require('./models/User.js');


var twilioFunc = ()=>{
  var today = new Date();
  User.findOne({
    date: `${today.getFullYear()}-${today.getMonth()+1}-0${today.getDate()}`,
    time: `${today.getHours()}:${today.getMinutes()}`
  }).then(result=>{
    if (result){
      client.calls.create({
  url: "http://demo.twilio.com/docs/voice.xml",
  to: '+'+result.phoneNumber,
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
