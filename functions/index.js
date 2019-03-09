const functions = require('firebase-functions');
const admin = require('firebase-admin');
const swapCall = require('./swapCallRinkeby');

admin.initializeApp();

exports.executeTransaction = functions.database.ref('/tx/{pushId}')
  .onCreate((snapshot, context) => {
    const original = snapshot.val();

    if (original.status === 'pending') {
      const {
        to,
        currencyTo,
        amount,
      } = original;

      console.log('New pending transaction, swaping time!');

      return swapCall.swap(to, amount, currencyTo)
        .then((tx) => {
          console.log('Tx hash is', tx.hash);

          return snapshot.ref.update({
            status: "completed",
            hash: tx.hash,
          });
        })
        .catch((err) => {
          console.log('Something went wrong...');
          console.log(err);

          return err;
        });
    }

    return null;
  });
