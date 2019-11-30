const functions = require('firebase-functions');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.databaseTrigger = functions.database.ref('/Transactions/{keyId}/')
    .onWrite((change, context) => {
    
      // Grab the current value of what was written to the Realtime Database.
      const cipher = change.after.val();
      console.log('Uppercasing', context.params.keyId, cipher);
      
      var  ref = firebase.database().ref("Registrations/"+context.params.keyId+"/D");
       ref.on("value",function(snapshot){console.log(snapshot.val());},function(error){console.log("Error",error)});
      
     
    });
    
    
   /* admin.database().ref('/users/'+event.params.id+'/NotificationToken/IOS').once('v‌​alue').then((snapshot) => { 
var token=snapshot.val().IOS;

 });*/
/*exports.helloWorld = functions.https.onRequest((req, res) => {

    var cipher = 11;
    var d = 2;
    var n = 2;
    var result = Math.pow(cipher, d);
    result = result % n;
    console.log(result.toString());
    
    res.send("Plain text after decryption is ".concat(result.toString()));
    
});*/


