const uniswapLogic = require('./swapLogic/uniswapLogic.js');
const ethDirectSend = require('./swapLogic/ethDirectSend.js');
const getPriceFeed = require('./data/priceInfo.js');

const tokens = {
  DAI: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
  WOMG: '0x69657e421c993a65e31f571b4ce742fafb318bd4',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  ZRX: '0xe41d2489571d322189246dafa5ebde1f4699f498',
  BAT: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  LINK: '0x514910771af9ca656af840dff83e8264ecf986ca',
  ANT: '0x960b236A07cf122663c4303350609A66A7B288C0',
  KNC: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
  GUSD: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
  REP: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
  SPANK: '0x42d6622deCe394b54999Fbd73D108123806f6a18'
};

module.exports = {
    swap: swap
}

function swap(recipientAddress, amount, ticker, currencyFrom) {
  return getPriceFeed.getPrice(currencyFrom)
    .then((rate) => {
      const newAmount = (parseFloat(amount, 10) / rate) * 0.99;
      const newAmountString = newAmount.toString();
      const snippedNewAmountString = newAmountString.substring(0, newAmountString.split('.')[0].length + 19);

      if (ticker.toUpperCase() === 'ETH') {
        console.log(`Swapping ${currencyFrom} to ETH`);
        return ethDirectSend.sendEth(recipientAddress, snippedNewAmountString);
      } else {
        console.log(`Swapping ${currencyFrom} to ${ticker.toUpperCase()}`);
        console.log(`Using contract at ${tokens[ticker.toUpperCase()]}`);
        return uniswapLogic.uniswapHotSwap(recipientAddress, snippedNewAmountString, tokens[ticker.toUpperCase()]);
      }
    })
}
