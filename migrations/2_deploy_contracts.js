var SupplierStorage = artifacts.require("./storage/SupplierStorage.sol");
var ProductStorage = artifacts.require("./storage/ProductStorage.sol");
var LogStorage = artifacts.require("./storage/LogStorage.sol");
var PartnerStorage = artifacts.require("./storage/PartnerStorage.sol");
var RateStorage = artifacts.require("./storage/RateStorage.sol");

module.exports = function(deployer) {
    deployer.deploy(SupplierStorage)
    deployer.deploy(ProductStorage)
    deployer.deploy(LogStorage)
    deployer.deploy(PartnerStorage)
    deployer.deploy(RateStorage)
};
