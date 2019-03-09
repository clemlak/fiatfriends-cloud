const axios = require('axios');

module.exports = {
    getPrice: getPrice
}

function getPrice(currencyFrom) {
    return axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${currencyFrom}&vs_currencies=ETH`)
        .then(response => {
            if (response.status !== 200) {
                throw Error(response.status)
            } else {
                return parseFloat(response.data[currencyFrom.toLowerCase()]['eth'], 10)
            }
        })
}
