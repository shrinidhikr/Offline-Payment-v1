const functions = require('firebase-functions');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.helloWorld = functions.https.onRequest((req, res) => {

    var cipher = 11;
    var d = 2;
    var n = 2;
    var result = Math.pow(cipher, d);
    result = result % n;
    console.log(result.toString());
    
    res.send("Plain text after decryption is ".concat(result.toString()));
    
});



