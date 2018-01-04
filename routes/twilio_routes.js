const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const twilio = require('twilio');
let VoiceResponse = twilio.twiml.VoiceResponse;
let config = {};  
if (process.env.PORT){
  config = {
    accountSid: process.env.accountSid,
    authToken: process.env.authToken,
    twilioNumber: process.env.twilioNumber
  }
} else {
  config = require('../config/auth.js').twilio;
}

// Create a Twilio REST API client for authenticated requests to Twilio
const client = twilio(config.accountSid, config.authToken);


// Configure application routes
module.exports = (app) => {
    // Handle an AJAX POST request to place an outbound call
    app.post('/call', function(request, response) {
        // This should be the publicly accessible URL for your application
        // Here, we just use the host for the application making the request,
        // but you can hard code it or use something different if need be
        // var salesNumber = request.body.salesNumber;
        var url = 'http://' + request.headers.host + '/outbound/' + encodeURIComponent(config.twilioNumber)
        // var url = 'http://' + request.headers.host + '/outbound'
        // console.log('url is', url)
        // console.log('phoneNumber is', request.body.phoneNumber)
        var options = {
            to: request.body.phoneNumber,
            from: config.twilioNumber,
            url: url,
        };
  
        // Place an outbound call to the user, using the TwiML instructions
        // from the /outbound route
        client.calls.create(options)
          .then((message) => {
            // console.log(message.responseText);
            response.send({
                message: 'Thank you! Chi-bot will be calling you shortly.',
            });
          })
          .catch((error) => {
            console.log(error);
            response.status(500).send(error);
          });
    });

    // Return TwiML instuctions for the outbound call
    app.post('/outbound/:twilioNumber', function(req, res) {
        var twimlResponse = new VoiceResponse();
        const timeout = 2;  
        // console.log('got to outbound route')
        twimlResponse.say("Hello There! Chee-bot is excited to talk to you.  Are you excited?");
        twimlResponse.gather({
          hints: 'yes, no',
          input: 'speech',
          timeout: timeout,
          action:'/saidSomething'
        }).say('Please say Yes, or, No.')
        twimlResponse.say(`No response given in ${timeout} seconds `);
        twimlResponse.hangup();
        // twimlResponse.redirect({
        //   method:'POST'
        // }, '/outbound/123')                                                              

        // console.log("outbound", twimlResponse.toString());
        res.type('text/xml');
        res.send(twimlResponse.toString());
      });
      
    app.post('/saidSomething', (req, res) => {
      // console.log(req.body.SpeechResult)
      var twimlResponse = new VoiceResponse();
      const yesOrNo = req.body.SpeechResult;  
      if (yesOrNo === 'No.'){
        twimlResponse.say('You said no, how disappointing');
      } else if (yesOrNo === 'Yes.'){
        twimlResponse.say(`You said yes, how exciting! Yay yay yay!`);
      } else {
        twimlResponse.say('I did not understand you')
      }

      res.type('text/xml');
      res.send(twimlResponse.toString());
  })
};