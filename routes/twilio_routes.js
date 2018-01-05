const twilio = require('twilio');
let {VoiceResponse} = twilio.twiml;
const twilio_timeout_in_seconds = 2;  

module.exports = (app) => {
    // Return TwiML instuctions for the outbound call
    app.post('/outbound/:userID', (req, res) => {
        var twimlResponse = new VoiceResponse();
        // console.log('got to outbound route')
        twimlResponse.say("Hello! Safe-Dates App is checking on you.  Everything OK?");
        twimlResponse.gather({
          hints: 'yes, no',
          input: 'speech',
          timeout: twilio_timeout_in_seconds,
          action:'/callerResponse/' + req.params.userID
        }).say('Please say Yes, or, No.')
        twimlResponse.say(`No response given in ${timeout} seconds `);
        twimlResponse.hangup();

        res.type('text/xml');
        res.send(twimlResponse.toString());
      });
      
    app.post('/callerResponse/:userID', (req, res) => {
      // console.log(req.body.SpeechResult)
      var twimlResponse = new VoiceResponse();
      const yesOrNo = req.body.SpeechResult;  
      if (yesOrNo === 'No.'){
        twimlResponse.say('You said no, Safe-Dates App will call your venue staff now.');
        //TODO: Add another Call
      } else if (yesOrNo === 'Yes.'){
        twimlResponse.say(`You said yes, have a great date!`);
      } else {
        twimlResponse.say('I did not understand you')
      }

      res.type('text/xml');
      res.send(twimlResponse.toString());
  })
};