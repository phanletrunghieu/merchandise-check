pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./storage/SupplierStorage.sol";
import "./storage/ProductStorage.sol";
import "./storage/LogStorage.sol";
import "./storage/PartnerStorage.sol";
import "./storage/RateStorage.sol";
import "./util/Ownable.sol";

contract MerchandiseCheck is Ownable {
    using ConvertUtils for *;

    SupplierStorage private supplierStorage;
    ProductStorage private productStorage;
    LogStorage private logStorage;
    PartnerStorage private partnerStorage;
    RateStorage private rateStorage;

    constructor (address _supplierStorage, address _productStorage, address _logStorage, address _partnerStorage, address _rateStorage) public {
        setSupplierStorage(_supplierStorage);
        setProductStorage(_productStorage);
        setLogStorage(_logStorage);
        setPartnerStorage(_partnerStorage);
        setRateStorage(_rateStorage);
    }

    // set storage
    function setSupplierStorage(address _address) public {
        supplierStorage = SupplierStorage(_address);
    }
    function setProductStorage(address _address) public {
        productStorage = ProductStorage(_address);
    }
    function setLogStorage(address _address) public {
        logStorage = LogStorage(_address);
    }
    function setPartnerStorage(address _address) public {
        partnerStorage = PartnerStorage(_address);
    }
    function setRateStorage(address _address) public {
        rateStorage = RateStorage(_address);
    }

    // create
    function createSupplier(address _address, string _name) public onlyOwner {
        supplierStorage.createSupplier(_address, _name);
    }

    function createProduct(bytes32 _id, string _name, string _description, string _image) public {
        productStorage.createProduct(_id, msg.sender, _name, _description, _image);
        supplierStorage.addProduct(msg.sender, _id);
    }

    function createLog(bytes32 _id, bytes32 _productId, string _description, string _video) public {
        ProductModel.Product memory product = productStorage.getProduct(_productId);
        bool isProductOwner = product.owner == msg.sender;
        uint senderHash = msg.sender.addressToBytes().bytesArrayToUint();
        bool isPartner = false;
        if(senderHash < product.partnerIdsIndex.length){
            isPartner = product.partnerIdsIndex[senderHash] != 0x0;
        }
        require(isProductOwner || isPartner, "don't have permission to add log");

        logStorage.createLog(_id, _productId, _description, msg.sender, _video, block.timestamp);
        productStorage.addLog(_productId, _id);
    }

    function createPartner(address _address, string _name) public {
        bytes32 _id = _address.addressToBytes();
        partnerStorage.createPartner(_id, _address, _name, msg.sender);
        supplierStorage.addPartner(msg.sender, _id);
    }

    // get
    function getListSuppliers() public view returns(SupplierModel.Supplier[]) {
        return supplierStorage.getListSuppliers();
    }

    function getSupplier(address _supplierAddress) public view returns(SupplierModel.Supplier) {
        return supplierStorage.getSupplier(_supplierAddress);
    }

    function getProduct(bytes32 _productId) public view returns(ProductModel.Product) {
        return productStorage.getProduct(_productId);
    }

    function getLog(bytes32 _logId) public view returns(LogModel.Log) {
        return logStorage.getLog(_logId);
    }

    function getPartner(bytes32 _id) public view returns (PartnerModel.Partner) {
        return partnerStorage.getPartner(_id);
    }
    
    function getProductsBySupplier(address _supplierAddress) public view returns(ProductModel.Product[] products) {
        SupplierModel.Supplier memory supplier = supplierStorage.getSupplier(_supplierAddress);
        if(supplier.productIds.length<=1){
            return products;
        }
        products = new ProductModel.Product[](supplier.productIds.length-1);
        for (uint256 i = 1; i < supplier.productIds.length; i++) {
            ProductModel.Product memory p = productStorage.getProduct(supplier.productIds[i]);
            products[i-1] = p;
        }
    }

    function getProductsByPartner(bytes32 _partnerId) public view returns(ProductModel.Product[] products) {
        PartnerModel.Partner memory partner = partnerStorage.getPartner(_partnerId);
        if(partner.productIds.length<=1){
            return products;
        }
        products = new ProductModel.Product[](partner.productIds.length-1);
        for (uint256 i = 1; i < partner.productIds.length; i++) {
            ProductModel.Product memory p = productStorage.getProduct(partner.productIds[i]);
            products[i-1] = p;
        }
    }

    function getLogsByProduct(bytes32 _productId) public view returns(LogModel.Log[] logs) {
        ProductModel.Product memory product = productStorage.getProduct(_productId);
        if(product.logIds.length<=1){
            return logs;
        }
        logs = new LogModel.Log[](product.logIds.length-1);
        for (uint256 i = 1; i < product.logIds.length; i++) {
            LogModel.Log memory log = logStorage.getLog(product.logIds[i]);
            logs[i-1] = log;
        }

        return logs;
    }

    function getPartnersBySupplier(address _supplierAddress) public view returns(PartnerModel.Partner[] partners) {
        SupplierModel.Supplier memory supplier = supplierStorage.getSupplier(_supplierAddress);
        if(supplier.partnerIds.length<=1){
            return partners;
        }
        partners = new PartnerModel.Partner[](supplier.partnerIds.length-1);
        for (uint256 i = 1; i < supplier.partnerIds.length; i++) {
            PartnerModel.Partner memory p = partnerStorage.getPartner(supplier.partnerIds[i]);
            partners[i-1] = p;
        }
    }

    function getPartnersByProduct(bytes32 _productId) public view returns(PartnerModel.Partner[] partners, uint256[] rates) {
        ProductModel.Product memory product = productStorage.getProduct(_productId);
        if(product.partnerIds.length<=1){
            return (partners, rates);
        }
        partners = new PartnerModel.Partner[](product.partnerIds.length-1);
        rates = new uint256[](product.partnerIds.length-1);
        for (uint256 i = 1; i < product.partnerIds.length; i++) {
            bytes32 partnerId = product.partnerIds[i];
            PartnerModel.Partner memory p = partnerStorage.getPartner(partnerId);
            partners[i-1] = p;
            rates[i-1] = rateStorage.getAverageRate(partnerId);
        }
    }

    // update
    function updateSupplier(address _address, string _name) public {
        supplierStorage.updateSupplier(_address, _name);
    }

    function updateProduct(bytes32 _id, string _name, string _description, string _image) public {
        productStorage.updateProduct(_id, _name, _description, _image);
    }

    function updatePartner(bytes32 _id, string _name) public {
        partnerStorage.updatePartner(_id, _name);
    }

    function ratePartner(bytes32 _partnerId, uint8 _star) public {
        rateStorage.rate(_partnerId, _star);
    }

    function getAverageRate(bytes32 _partnerId) public view returns(uint256) {
        return rateStorage.getAverageRate(_partnerId);
    }

    function getRatesByPartner(bytes32 _partnerId) public view returns(uint8[]) {
        return rateStorage.getRatesByPartner(_partnerId);
    }

    // delete
    function deleteSupplier(address _address) public {
        supplierStorage.deleteSupplier(_address);
    }

    function deleteProduct(bytes32 _id) public {
        ProductModel.Product memory product = productStorage.getProduct(_id);
        supplierStorage.removeProduct(product.owner, _id);
        productStorage.deleteProduct(_id);
    }

    function deleteLog(bytes32 _id) public {
        LogModel.Log memory log = logStorage.getLog(_id);
        productStorage.removeLog(log.productId, _id);
        logStorage.deleteLog(_id);
    }

    function deletePartner(bytes32 _partnerId) public {
        PartnerModel.Partner memory partner = partnerStorage.getPartner(_partnerId);
        supplierStorage.removePartner(partner.supplier, _partnerId);
        // partnerStorage.deletePartner(_partnerId);
    }

    function assignProductToPartner(bytes32 _productId, bytes32 _partnerId) public {
        productStorage.addPartner(_productId, _partnerId);
        partnerStorage.addProduct(_partnerId, _productId);
    }

    function unassignProductToPartner(bytes32 _productId, bytes32 _partnerId) public {
        productStorage.removePartner(_productId, _partnerId);
        partnerStorage.removeProduct(_partnerId, _productId);
    }
}