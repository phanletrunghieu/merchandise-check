pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "../model/SupplierModel.sol";
import "../util/ConvertUtils.sol";

contract SupplierStorage {
    using ConvertUtils for *;

    mapping(address => SupplierModel.Supplier) public supplierList;
    address[] public supplierIndex;

    modifier isSupplier(address _address) {
        require(supplierList[_address].addr!=0x0, "this account is not a supplier");
        _;
    }

    modifier isNotSupplier(address _address) {
        require(supplierList[_address].addr==0x0, "this account is a supplier");
        _;
    }

    function createSupplier(address _address, string _name) public isNotSupplier(_address) {
        uint256 newIndex = supplierIndex.length;

        supplierList[_address].addr = _address;
        supplierList[_address].name = _name;
        supplierList[_address].index = newIndex;

        supplierIndex.push(_address);
    }

    function getListSuppliers() public view returns(SupplierModel.Supplier[]) {
        SupplierModel.Supplier[] memory list = new SupplierModel.Supplier[](supplierIndex.length);
        for (uint256 i = 0; i < supplierIndex.length; i++) {
            list[i] = supplierList[supplierIndex[i]];
        }
        return list;
    }

    function getSupplier(address _address) public view isSupplier(_address) returns (SupplierModel.Supplier) {
        return supplierList[_address];
    }

    function deleteSupplier(address _address) public {
        supplierList[_address].addr = 0x0;
        uint256 toDeleteIndex = supplierList[_address].index;

        supplierIndex[toDeleteIndex] = supplierIndex[supplierIndex.length-1];
        supplierIndex.length--;

        if(supplierIndex.length > 0) {
            supplierList[supplierIndex[toDeleteIndex]].index = toDeleteIndex;
        }
    }

    function updateSupplier(address _address, string _name) public isSupplier(_address) {
        supplierList[_address].name = _name;
    }

    function addProduct(address _address, bytes32 _productID) public isSupplier(_address) {
        // prevent index == 0
        if(supplierList[_address].productIds.length == 0){
            supplierList[_address].productIds.length = 1;
        }

        supplierList[_address].productIds.push(_productID);

        uint productIDHash = _productID.bytesArrayToUint();
        if (supplierList[_address].productIdsIndex.length <= productIDHash) {
            supplierList[_address].productIdsIndex.length = productIDHash + 1;
        }
        supplierList[_address].productIdsIndex[productIDHash] = supplierList[_address].productIds.length-1;
    }

    function removeProduct(address _address, bytes32 _productID) public isSupplier(_address) {
        uint productIDHash = _productID.bytesArrayToUint();
        uint256 indexToRemove = supplierList[_address].productIdsIndex[productIDHash];
        require(indexToRemove!=0x0, "product is not exist");

        supplierList[_address].productIds[indexToRemove] = supplierList[_address].productIds[supplierList[_address].productIds.length-1];

        //delete the last element from productIds
        supplierList[_address].productIds.length--;

        //reset index to 0
        supplierList[_address].productIdsIndex[productIDHash] = 0;
    }

    function addPartner(address _address, bytes32 _partnerID) public isSupplier(_address) {
        // prevent index == 0
        if(supplierList[_address].partnerIds.length == 0){
            supplierList[_address].partnerIds.length = 1;
        }

        supplierList[_address].partnerIds.push(_partnerID);

        uint partnerIDHash = _partnerID.bytesArrayToUint();
        if (supplierList[_address].partnerIdsIndex.length <= partnerIDHash) {
            supplierList[_address].partnerIdsIndex.length = partnerIDHash + 1;
        }
        supplierList[_address].partnerIdsIndex[partnerIDHash] = supplierList[_address].partnerIds.length-1;
    }

    function removePartner(address _address, bytes32 _partnerID) public isSupplier(_address) {
        uint partnerIDHash = _partnerID.bytesArrayToUint();
        uint256 indexToRemove = supplierList[_address].partnerIdsIndex[partnerIDHash];
        require(indexToRemove!=0x0, "partner is not exist");

        supplierList[_address].partnerIds[indexToRemove] = supplierList[_address].partnerIds[supplierList[_address].partnerIds.length-1];

        //delete the last element from partnerIds
        supplierList[_address].partnerIds.length--;

        //reset index to 0
        supplierList[_address].partnerIdsIndex[partnerIDHash] = 0;
    }
}