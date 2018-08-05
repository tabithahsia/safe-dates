const User = require('../models/User.js');
const twilio = require('twilio');
const moment = require('moment');
const config = process.env.PORT ? ({ authToken, accountSid, twilioNumber }) => (
  { authToken, accountSid, twilioNumber }
)(process.env) : require('../config/Auth.config.js').twilio;

const client = twilio(config.accountSid, config.authToken);

const twilioFunc = () => {
  const thisMinute = moment().utc().format().slice(0, -4);
  console.log('thisMinute', thisMinute);
  // look for users that need to be called right now
  User.findOne({ UTCdateTime: thisMinute }).then(result => {
    // if found
    if (result) {
      // const url = `http://${request.headers.host}/outbound/${result._id}`;
      console.log('invoking Twilio actions', result);
      // client.calls.create({
      //   to: result.locationNumber,
      //   from: config.twilioNumber,
      //   url,
      // });
    }
  });
};

module.exports = () => setInterval(twilioFunc, 60000);
