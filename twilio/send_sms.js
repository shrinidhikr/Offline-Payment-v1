// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC2dc63a35a0295ccfd0e0e301f6b251ff';
const authToken = '610b3e201e46e4580c7f08f33683c42a';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12409497910',
     to: '+919620220642'
   })
  .then(message => console.log(message.sid));
