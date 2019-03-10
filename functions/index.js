const functions = require('firebase-functions');
const admin = require('firebase-admin');
const swapCall = require('./swapCall');

admin.initializeApp();

exports.executeRevolut = functions.database.ref('/tx/{pushId}')
  .onCreate((snapshot, context) => {
    const original = snapshot.val();

    if (original.status === 'pending') {
      const {
        to,
        currencyTo,
        amount,
        currencyFrom,
      } = original;

      console.log('New pending transaction, swaping time!');

      return swapCall.swap(to, amount, currencyTo, currencyFrom)
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

  exports.executeVenmo = functions.database.ref('/venmo/{pushId}')
    .onWrite((snapshot, context) => {
      const after = snapshot.after.val();

      console.log(after);

      if (after && after.status === 'pending' && after.hash === undefined) {
        const {
          to,
          currencyTo,
          amount,
          currencyFrom,
        } = after;

        console.log('New pending transaction, swaping time!');

        return swapCall.swap(to, amount, currencyTo, currencyFrom)
          .then((tx) => {
            console.log('Tx hash is', tx.hash);

            return snapshot.after.ref.update({
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
