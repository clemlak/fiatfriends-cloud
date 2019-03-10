const uniswapLogic = require('./swapLogic/uniswapLogic.js');
const ethDirectSend = require('./swapLogic/ethDirectSend.js');
const getPriceFeed = require('./data/priceInfo.js');

module.exports = {
    swap: swap
}

function swap(recipientAddress, amount, ticker, currencyFrom){
    return getPriceFeed.getPrice(currencyFrom)
        .then((rate) => {
            const newAmount = (parseFloat(amount, 10) / rate) * 0.99;
            const newAmountString = newAmount.toString();
            const snippedNewAmountString = newAmountString.substring(0, newAmountString.split('.')[0].length + 19);
            
            if (ticker === "DAI") {
                let tokenAddress = "0x1D329f63dbd2DfCa686a87c90D4Fe4b802F3E34D";
                return uniswapLogic.uniswapHotSwap(recipientAddress, snippedNewAmountString, tokenAddress);
            }
            else {
                return ethDirectSend.sendEth(recipientAddress, snippedNewAmountString);
            }
        })


}
