const functions = require('firebase-functions');

const RSA = require('./rsa');

var admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();


exports.transactD = functions.database.ref('/Transactions/{keyId}/').onWrite((change,context) => {

      const cipher = change.after.val();
      console.log('Cipher',context.params.keyId, cipher);
    
      // Grab the current value of what was written to the Realtime Database.

       var ref = db.ref("/Registration/"+context.params.keyId.toString()+"/d");
       ref.on("value",function(snapshot){
       var d = snapshot.val();
       console.log("d val",d.toString());
       },function(error){
       console.log(error);
       });
        
       
       var ref = db.ref("/Registration/"+context.params.keyId.toString()+"/n");
       ref.on("value",function(snapshot){
       var n = snapshot.val();
       console.log("n val",n.toString());
       },function(error){
       console.log(error);
       });
       
       const decrypted_message = RSA.decrypt(cipher, d, n);
       const decoded_message = RSA.decode(decrypted_message);
       
       
       
       
    });
    


 
