const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const defaultProvider = ethers.getDefaultProvider("rinkeby");

const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, defaultProvider);

module.exports = {
    wallet: wallet
}
