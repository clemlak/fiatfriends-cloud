const ethers = require('ethers');
const ethersConfig = require("../data/ethersConfig.js");

module.exports = {
    sendEth: sendEth
}

function sendEth(recipientAddress, amount){
  console.log(`Sending ${amount} to ${recipientAddress}`);

    let transaction = {
        to: recipientAddress,
        value: ethers.utils.parseEther(amount),
    }
    return ethersConfig.wallet.sendTransaction(transaction)
      .then((tx) => tx)
      .catch((err) => err);
}
