var ethers = require('ethers');
var ProductStorage = artifacts.require("./storage/ProductStorage.sol");

contract('ProductStorage', function(accounts) {
    let provider = new ethers.providers.Web3Provider(web3.currentProvider)
    let productID = "b6d093e457714f00a2eb76c1056e7f17"
    let productImage = "QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn"
    let logID = "b6d093e457714f10a2eb76c1056e7f17"
    let partnerAddress = "0x4D4E75410793Bbbc321833CD6fcA2cDEe2AD472F"
    

    it("...create a product.", function() {
        let productStorageInstance;

        return ProductStorage.deployed().then(function(instance) {
            productStorageInstance = new ethers.Contract(ProductStorage.address, ProductStorage._json.abi, provider);
            return instance.createProduct(productID, accounts[0], 'Tom cao su', "des", productImage, {from: accounts[0]});
        }).then(function() {
            return productStorageInstance.getProduct(web3.fromUtf8(productID))
        })
        .then(function(product) {
            assert.equal(web3.toUtf8(product.id), productID, "The product is not created (id).");
            assert.equal(product.name, 'Tom cao su', "The product is not created (name).");
            assert.equal(product.description, 'des', "The product is not created (description).");
            assert.equal(product.owner.toLowerCase(), accounts[0].toLowerCase(), "The product is not created (owner).");
        });
    });

    it("...update a product's name.", function() {
        let productStorageInstance;

        return ProductStorage.deployed().then(function(instance) {
            productStorageInstance = new ethers.Contract(ProductStorage.address, ProductStorage._json.abi, provider)
            return instance.setName(productID, 'Ca cao su', {from: accounts[0]});
        }).then(function() {
            return productStorageInstance.getProduct(web3.fromUtf8(productID))
        })
        .then(function(product) {
            assert.equal(product.name, 'Ca cao su', "The product's name isn't updated.");
        });
    });

    it("...add & remove a log.", function() {
        let productStorageInstance;
        let productStorageInstanceWeb3;

        return ProductStorage.deployed().then(function(instance) {
            productStorageInstanceWeb3 = instance;
            productStorageInstance = new ethers.Contract(ProductStorage.address, ProductStorage._json.abi, provider)
            return instance.addLog(web3.fromUtf8(productID), web3.fromUtf8(logID), {from: accounts[0]});
        }).then(function() {
            return productStorageInstance.getProduct(web3.fromUtf8(productID))
        })
        .then(function(product) {
            let matched = false;
            product.logIds.map(lID=>{
                if (web3.toUtf8(lID) == logID) {
                    matched = true;
                }
            })

            assert.equal(matched, true, "Log is not add to the product.");

            if (!matched) {
                return;
            }

            return productStorageInstanceWeb3.removeLog(web3.fromUtf8(productID), web3.fromUtf8(logID), {from: accounts[0]});
        })
        .then(()=>productStorageInstance.getProduct(web3.fromUtf8(productID)))
        .then(product=>{
            let matched = false;
            product.logIds.map(lID=>{
                if (web3.toUtf8(lID) == logID) {
                    matched = true;
                }
            })

            assert.equal(matched, false, "Log is not removed from the product.");
        })
    });

    it("...add & remove a partner.", function() {
        let productStorageInstance;
        let productStorageInstanceWeb3;

        return ProductStorage.deployed().then(function(instance) {
            productStorageInstanceWeb3 = instance;
            productStorageInstance = new ethers.Contract(ProductStorage.address, ProductStorage._json.abi, provider)
            return instance.addPartner(web3.fromUtf8(productID), partnerAddress, {from: accounts[0]});
        }).then(function() {
            return productStorageInstance.getProduct(web3.fromUtf8(productID))
        })
        .then(function(product) {
            let matched = false;
            product.partners.map(p=>{
                if (p == partnerAddress) {
                    matched = true;
                }
            })

            assert.equal(matched, true, "partner is not add to the product.");

            if (!matched) {
                return;
            }

            return productStorageInstanceWeb3.removePartner(web3.fromUtf8(productID), partnerAddress, {from: accounts[0]});
        })
        .then(()=>productStorageInstance.getProduct(web3.fromUtf8(productID)))
        .then(product=>{
            let matched = false;
            product.partners.map(p=>{
                if (p == partnerAddress) {
                    matched = true;
                }
            })

            assert.equal(matched, false, "partner is not removed from the product.");
        })
    });
});
