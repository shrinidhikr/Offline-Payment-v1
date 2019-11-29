const functions = require('firebase-functions');

exports.databaseTrigger = functions.database.ref('/Transactions/')
    .onWrite((change, context) => {
    
      // Grab the current value of what was written to the Realtime Database.
      const original = change.after.val();
      console.log('Uppercasing', context.params.pushId, original);
    });
    
