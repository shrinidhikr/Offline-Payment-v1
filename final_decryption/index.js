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
         
       var ref = db.ref("/en-de-keys/"+context.params.keyId.toString()+"/n");
       ref.on("value",function(snapshot){
       var n = snapshot.val();
       console.log("n val",n.toString());
       },function(error){
       console.log(error);
       });
       
       const decrypted_message = RSA.decrypt(cipher, d, n);
       const decoded_message = RSA.decode(decrypted_message);
       
       var message = decoded_message.split(" ");
       
       var sender_acc = context.params.keyId.toString();
       
       var ref = db.ref("/Phone_Acc/"+message[0]);
       ref.on("value",function(snapshot){
       var receiver_acc = snapshot.val().toString();
       console.log("Receiver accno", receiver_acc);
       },function(error){
       console.log(error);
       });
       
       var transaction_amount = parseInt(message[1]);       
       
       var ref = db.ref("/Balance/"+sender_acc);
       ref.on("value",function(snapshot){
       var sender_balance = snapshot.val().toString();
       console.log("Sender bal", sender_balance);
       },function(error){
       console.log(error);
       });
       
       var ref = db.ref("/Balance/"+receiver_acc);
       ref.on("value",function(snapshot){
       var receiver_balance = snapshot.val().toString();
       console.log("Receiver bal", receiver_balance);
       },function(error){
       console.log(error);
       });
      
       if (parseInt(sender_balance) - parseInt(transaction_amount))
       {
           var ref = db.ref("/Balance");
           ref.update({
              sender_acc: parseInt(sender_balance) - parseInt(transaction_amount);
           });
          
           var ref = db.ref("/Balance");
           ref.update({
              receiver_acc: parseInt(receiver_balance) + parseInt(transaction_amount);
           });
       }
            
       
    });
     


 
