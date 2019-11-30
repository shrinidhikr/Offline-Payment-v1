const functions = require('firebase-functions');

const RSA = require('./rsa');

var admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();


exports.generateE = functions.database.ref('/Registration/{keyId}/').onWrite((change,context) => {
    
      // Grab the current value of what was written to the Realtime Database.
      
      // Generate RSA keys
        const keys = RSA.generate(250);

        //console.log('Keys');
        console.log('n:', keys.n.toString());
        console.log('d:', keys.d.toString());
        console.log('e:', keys.e.toString());
        



       var ref = db.ref("/Registration/"+context.params.keyId.toString());
       ref.update({
          d:keys.d.toString()
       });
        ref.update({
          n:keys.n.toString()
       });
        ref.update({
          e:keys.e.toString()
       });
             
    });
    


 
