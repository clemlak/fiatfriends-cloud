const uniswapLogic = require('./swapLogic/uniswapLogic.js');
const ethDirectSend = require('./swapLogic/ethDirectSend.js');
const getPriceFeed = require('./data/priceInfo.js');

module.exports = {
    swap: swap
}

function swap(recipientAddress, amount, ticker, currencyFrom) {
  let newAmount;

  if (currencyFrom.toLowerCase() === 'eur') {
    newAmount = 0.0082237 * amount;
    console.log(newAmount);
  } else if (currencyFrom.toLowerCase() === 'usd') {
    newAmount = 0.0073292 * amount;
    console.log(newAmount);
  }

  if (ticker === "DAI") {
      let tokenAddress = "0x1D329f63dbd2DfCa686a87c90D4Fe4b802F3E34D";
      return uniswapLogic.uniswapHotSwap(recipientAddress, newAmount.toString(), tokenAddress);
  }
  else {
      return ethDirectSend.sendEth(recipientAddress, newAmount.toString());
  }
}
