var ethers = require('ethers');
var MerchandiseCheck = artifacts.require("./MerchandiseCheck.sol");

contract('MerchandiseCheck', function(accounts) {
    let provider = new ethers.providers.Web3Provider(web3.currentProvider);

    let supplier = {
        address: "0x4D4E75410793Bbbc321833CD6fcA2cDEe2AD472F",
        name: "Supplier 1"
    }
    let product = {
        id: "b6d093e457714f10a2eb76c1057e7f17",
        name: "Tom hum cao su",
        description: "des",
        image: "QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn"
    }
    let log = {
        id: "b6d093e457714f00a2eb76c1056e7f17",
        productId: product.id,
        description: "Thu hoach tai trang trai xxxx",
        createdAt: 1542763817
    }

    it("...create a supplier.", function() {
        let etherInstance;

        return MerchandiseCheck.deployed().then(function(instance) {
            etherInstance = new ethers.Contract(MerchandiseCheck.address, MerchandiseCheck._json.abi, provider);
            return instance.createSupplier(supplier.address, supplier.name, {from: accounts[0]});
        })
        .then(() => etherInstance.getSupplier(supplier.address))
        .then(function(s) {
            assert.equal(s.name, supplier.name, "The supplier is not created.");
        });
    });

    it("...create a product.", function() {
        let etherInstance;

        return MerchandiseCheck.deployed().then(function(instance) {
            etherInstance = new ethers.Contract(MerchandiseCheck.address, MerchandiseCheck._json.abi, provider);
            return instance.createProduct(product.id, product.name, product.description, product.image, {from: accounts[0]});
        }).then(function() {
            return etherInstance.getProduct(web3.fromUtf8(product.id))
        })
        .then(function(p) {
            assert.equal(web3.toUtf8(p.id), product.id, "The product is not created (id).");
            assert.equal(p.name, product.name, "The product is not created (name).");
            assert.equal(p.owner.toLowerCase(), accounts[0].toLowerCase(), "The product is not created (owner).");
        });
    });

    it("...create a log.", function() {
        let etherInstance;

        return MerchandiseCheck.deployed().then(function(instance) {
            etherInstance = new ethers.Contract(MerchandiseCheck.address, MerchandiseCheck._json.abi, provider);
            return instance.createLog(log.id, log.productId, log.description, log.createdAt, {from: accounts[0]});
        }).then(function() {
            return etherInstance.getLog(web3.fromUtf8(log.id))
        })
        .then(function(l) {
            assert.equal(web3.toUtf8(l.id), log.id, "The log is not created (id).");
            assert.equal(l.description, log.description, "The log is not created (description).");
            assert.equal(web3.toUtf8(l.productId), log.productId, "The log is not created (productID).");
            assert.equal(l.createdAt, log.createdAt, "The log is not created (createdAt).");
        });
    });
});
