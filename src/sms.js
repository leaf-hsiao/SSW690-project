// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'ACf1769cc16b2ed5a44b48a6d0d126e9fd';
const authToken = '03ea12fd8a7b568cc8230a035de0c98b';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Hi this is a test sms for the 690 project',
     from: '+16467661013',
     to: '+12019939683'
   })
  .then(message => console.log(message.sid));
  