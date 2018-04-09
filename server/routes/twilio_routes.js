const twilio = require('twilio');

const { VoiceResponse } = twilio.twiml;
const twilioTimeoutInSeconds = 2;

module.exports = app => {
  // Return TwiML instuctions for the outbound call
  app.post('/outbound/:userID', (req, res) => {
    const twimlResponse = new VoiceResponse();
    // console.log('got to outbound route')
    twimlResponse.say('Hello! Safe-Dates App is checking on you.  Everything OK?');
    twimlResponse.gather({
      hints: 'yes, no',
      input: 'speech',
      timeout: twilioTimeoutInSeconds,
      action: `/callerResponse/${req.params.userID}`
    }).say('Please say Yes, or, No.');
    twimlResponse.say(`No response given in ${twilioTimeoutInSeconds} seconds `);
    twimlResponse.hangup();

    res.type('text/xml');
    res.send(twimlResponse.toString());
  });

  app.post('/callerResponse/:userID', (req, res) => {
    // console.log(req.body.SpeechResult)
    const twimlResponse = new VoiceResponse();
    const yesOrNo = req.body.SpeechResult;
    if (yesOrNo === 'No.') {
      twimlResponse.say('You said no, Safe-Dates App will call your venue staff now.');
      // TODO: Add another Call
    } else if (yesOrNo === 'Yes.') {
      twimlResponse.say('You said yes, have a great date!');
    } else {
      twimlResponse.say('I did not understand you');
    }

    res.type('text/xml');
    res.send(twimlResponse.toString());
  });
};
