const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        ropsten: {
            provider: () => new HDWalletProvider("town shift mask occur brief maple club outdoor combine shy rescue dismiss", "https://ropsten.infura.io/v3/c2dc70773aeb4b5b94fcd0a2c16ff097"),
            network_id: 3,
            gas: 6000000,
            gasPrice: 1000000000,
        },
    }
};
