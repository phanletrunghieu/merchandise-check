var SupplierStorage = artifacts.require("./storage/SupplierStorage.sol");
var ProductStorage = artifacts.require("./storage/ProductStorage.sol");
var LogStorage = artifacts.require("./storage/LogStorage.sol");
var PartnerStorage = artifacts.require("./storage/PartnerStorage.sol");
var RateStorage = artifacts.require("./storage/RateStorage.sol");
var MerchandiseCheck = artifacts.require("./MerchandiseCheck.sol");

module.exports = function(deployer) {
    deployer.deploy(MerchandiseCheck, SupplierStorage.address, ProductStorage.address, LogStorage.address, PartnerStorage.address, RateStorage.address)
};
