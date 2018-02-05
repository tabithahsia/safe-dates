const User = require('./models/User.js');
const twilio = require('twilio');

let config = {};
if (process.env.PORT) {
  config = {
    accountSid: process.env.accountSid,
    authToken: process.env.authToken,
    twilioNumber: process.env.twilioNumber
  }
} else {
  config = require('./config/auth.js').twilio;
}
const client = twilio(config.accountSid, config.authToken);

const twilioFunc = () => {
  const today = new Date();
  const todayDate = today.getDate()
  
  // look for users that need to be called right now
  User.findOne({
    date: `${today.getFullYear()}-${today.getMonth() + 1}-${todayDate.length === 1 ? `0${todayDate}` : todayDate}`,
    time: `${today.getHours()}:${today.getMinutes()}`
  }).then(result => {
    // if found
    if (result) {
      const url = `http://${request.headers.host}/outbound/${result._id}`;
      // console.log("result is", result)
      client.calls.create({
        to: result.locationNumber,
        from: config.twilioNumber,
        url,
      })
    }
  })
}

module.exports = () => setInterval(twilioFunc, 60000);
