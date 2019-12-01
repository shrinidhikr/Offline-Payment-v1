const functions = require('firebase-functions');

const RSA = require('./rsa');

var admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();


exports.transactD = functions.database.ref('/Transactions/{keyId}/').onWrite((change,context) => {

      const cipher = change.after.val();
      console.log('Cipher',context.params.keyId, cipher);
    	var sender_acc = "";
    	var receiver_acc = "";
      // Grab the current value of what was written to the Realtime Database.
      var d = 0;
       var ref = db.ref("/en-de-keys/"+context.params.keyId.toString()+"/d");
       ref.on("value",function(snapshot){
       d = snapshot.val();
       console.log("d val",d.toString());
       },function(error){
       // console.log("Hi");
       console.log(error);
       });
         var n = 0;
       var ref = db.ref("/en-de-keys/"+context.params.keyId.toString()+"/n");
       ref.on("value",function(snapshot){
       n = snapshot.val();
       console.log("n val",n.toString());
       },function(error){
       // console.log("Hi");
       console.log(error);
       });
       
       const decrypted_message = RSA.decrypt(cipher, d, n);
       //console.log(decrypted_message);
       const decoded_message = RSA.decode(decrypted_message);
       console.log("gg");
       console.log(decoded_message);
       var message = decoded_message.split(" ");
       console.log(message);
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
       var sender_balance = 0;
       var receiver_balance = 0;
       var ref = db.ref("/Balance/"+message[0]);
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
              sender_acc: parseInt(sender_balance) - parseInt(transaction_amount)
           });
          
           var ref = db.ref("/Balance");
            ref.update({
              'receiver_acc': parseInt(receiver_balance) + parseInt(transaction_amount)
            });

       }
            
       
    });
     



 
