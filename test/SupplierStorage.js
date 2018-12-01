var ethers = require('ethers');
var SupplierStorage = artifacts.require("./storage/SupplierStorage.sol");

contract('SupplierStorage', function(accounts) {
    let provider = new ethers.providers.Web3Provider(web3.currentProvider);

    it("...create a supplier.", function() {
        let supplierStorageInstance;

        return SupplierStorage.deployed().then(function(instance) {
            supplierStorageInstance = new ethers.Contract(SupplierStorage.address, SupplierStorage._json.abi, provider)
            return instance.createSupplier(accounts[0], 'hieudeptrai', {from: accounts[0]});
        }).then(function() {
            return supplierStorageInstance.getSupplier(accounts[0])
            // return authenticationInstance.login.call();
        })
        .then(function(supplier) {
            assert.equal(supplier.name, 'hieudeptrai', "The supplier is not created.");
        });
    });

    it("...update a supplier's name.", function() {
        let supplierStorageInstance;

        return SupplierStorage.deployed().then(function(instance) {
            supplierStorageInstance = new ethers.Contract(SupplierStorage.address, SupplierStorage._json.abi, provider)
            return instance.setName(accounts[0], 'hieudeprattrai', {from: accounts[0]});
        }).then(function() {
            return supplierStorageInstance.getSupplier(accounts[0])
        })
        .then(function(supplier) {
            assert.equal(supplier.name, 'hieudeprattrai', "The supplier's name isn't updated.");
        });
    });

    it("...add & remove a product.", function() {
        let supplierStorageInstance;
        let supplierStorageInstanceWeb3;

        return SupplierStorage.deployed().then(function(instance) {
            supplierStorageInstanceWeb3 = instance;
            supplierStorageInstance = new ethers.Contract(SupplierStorage.address, SupplierStorage._json.abi, provider)
            return instance.addProduct(accounts[0], web3.fromUtf8("b6d093e457714f00a2eb76c1056e7f17"), {from: accounts[0]});
        }).then(function() {
            return supplierStorageInstance.getSupplier(accounts[0])
        })
        .then(function(supplier) {
            let matched = false;
            supplier.productIds.map(pID=>{
                if (web3.toUtf8(pID) == "b6d093e457714f00a2eb76c1056e7f17") {
                    matched = true;
                }
            })

            assert.equal(matched, true, "Product is not add to the supplier.");

            if (!matched) {
                return;
            }

            return supplierStorageInstanceWeb3.removeProduct(accounts[0], web3.fromUtf8("b6d093e457714f00a2eb76c1056e7f17"), {from: accounts[0]});
        })
        .then(()=>supplierStorageInstance.getSupplier(accounts[0]))
        .then(supplier=>{
            let matched = false;
            supplier.productIds.map(pID=>{
                if (web3.toUtf8(pID) == "b6d093e457714f00a2eb76c1056e7f17") {
                    matched = true;
                }
            })

            assert.equal(matched, false, "Product is not removed from the supplier.");
        })
    });
});
