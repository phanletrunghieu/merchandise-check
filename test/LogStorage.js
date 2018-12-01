var ethers = require('ethers');
var LogStorage = artifacts.require("./storage/LogStorage.sol");

contract('LogStorage', function(accounts) {
    let provider = new ethers.providers.Web3Provider(web3.currentProvider);

    let log = {
        id: "b6d093e457714f00a2eb76c1056e7f17",
        productId: "b6d093e457714f10a2eb76c1057e7f17",
        description: "Thu hoach tai trang trai xxxx",
        createdAt: 1542763817
    }

    it("...create a log.", function() {
        let logStorageInstance;

        return LogStorage.deployed().then(function(instance) {
            logStorageInstance = new ethers.Contract(LogStorage.address, LogStorage._json.abi, provider);
            return instance.createLog(log.id, log.productId, log.description, log.createdAt, {from: accounts[0]});
        }).then(function() {
            return logStorageInstance.getLog(web3.fromUtf8(log.id))
        })
        .then(function(l) {
            assert.equal(web3.toUtf8(l.id), log.id, "The log is not created (id).");
            assert.equal(l.description, log.description, "The log is not created (description).");
            assert.equal(web3.toUtf8(l.productId), log.productId, "The log is not created (productID).");
            assert.equal(l.createdAt, log.createdAt, "The log is not created (createdAt).");
        });
    });

    it("...update a log's description.", function() {
        let logStorageInstance;

        return LogStorage.deployed().then(function(instance) {
            logStorageInstance = new ethers.Contract(LogStorage.address, LogStorage._json.abi, provider)
            return instance.setDescription(log.id, 'Thu hoach tai trang trai yyyy', {from: accounts[0]});
        }).then(function() {
            return logStorageInstance.getLog(web3.fromUtf8(log.id))
        })
        .then(function(log) {
            assert.equal(log.description, 'Thu hoach tai trang trai yyyy', "The log's description isn't updated.");
        });
    });
});
