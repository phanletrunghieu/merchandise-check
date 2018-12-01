pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "../model/ProductModel.sol";
import "../util/ConvertUtils.sol";

contract ProductStorage {
    using ConvertUtils for *;

    mapping(bytes32 => ProductModel.Product) public productList;
    bytes32[] public productIndex;

    modifier isProduct(bytes32 _id) {
        require(productList[_id].owner!=0x0, "this id is not a product");
        _;
    }

    modifier isNotProduct(bytes32 _id) {
        require(productList[_id].owner==0x0, "this id is  a product");
        _;
    }

    function createProduct(bytes32 _id, address _owner, string _name, string _description, string _image) public {
        uint256 newIndex = productIndex.length;

        productList[_id].id = _id;
        productList[_id].owner = _owner;
        productList[_id].name = _name;
        productList[_id].description = _description;
        productList[_id].image = _image;
        productList[_id].index = newIndex;

        productIndex.push(_id);
    }

    function getProduct(bytes32 _id) public view returns (ProductModel.Product) {
        return productList[_id];
    }

    function deleteProduct(bytes32 _id) public {
        uint256 toDeleteIndex = productList[_id].index;

        productIndex[toDeleteIndex] = productIndex[productIndex.length-1];
        productIndex.length--;

        if(productIndex.length > 0) {
            productList[productIndex[toDeleteIndex]].index = toDeleteIndex;
        }
    }

    function updateProduct(bytes32 _id, string _name, string _description, string _image) public isProduct(_id) {
        productList[_id].name = _name;
        productList[_id].description = _description;
        productList[_id].image = _image;
    }

    function addLog(bytes32 _productID, bytes32 _logID) public isProduct(_productID) {
        // prevent index == 0
        if(productList[_productID].logIds.length == 0){
            productList[_productID].logIds.length = 1;
        }

        productList[_productID].logIds.push(_logID);

        uint logIDHash = _logID.bytesArrayToUint();
        if (productList[_productID].logIdsIndex.length <= logIDHash) {
            productList[_productID].logIdsIndex.length = logIDHash + 1;
        }
        productList[_productID].logIdsIndex[logIDHash] = productList[_productID].logIds.length-1;
    }

    function removeLog(bytes32 _productID, bytes32 _logID) public isProduct(_productID) {
        uint logIDHash = _logID.bytesArrayToUint();
        uint256 indexToRemove = productList[_productID].logIdsIndex[logIDHash];
        require(indexToRemove!=0x0, "product is not exist");

        productList[_productID].logIds[indexToRemove] = productList[_productID].logIds[productList[_productID].logIds.length-1];

        //delete the last element from logIds
        productList[_productID].logIds.length--;

        //reset index to 0
        productList[_productID].logIdsIndex[logIDHash] = 0;
    }

    function addPartner(bytes32 _productID, bytes32 _partner) public {
        // prevent index == 0
        if(productList[_productID].partnerIds.length == 0){
            productList[_productID].partnerIds.length = 1;
        }

        productList[_productID].partnerIds.push(_partner);

        uint256 partnerHash = _partner.bytesArrayToUint();
        if (productList[_productID].partnerIdsIndex.length <= partnerHash) {
            productList[_productID].partnerIdsIndex.length = partnerHash + 1;
        }
        productList[_productID].partnerIdsIndex[partnerHash] = productList[_productID].partnerIds.length-1;
    }

    function removePartner(bytes32 _productID, bytes32 _partner) public {
        uint256 partnerHash = _partner.bytesArrayToUint();
        uint256 indexToRemove = productList[_productID].partnerIdsIndex[partnerHash];
        require(indexToRemove!=0x0, "partner is not exist");

        productList[_productID].partnerIds[indexToRemove] = productList[_productID].partnerIds[productList[_productID].partnerIds.length-1];

        //delete the last element from partnerIds
        productList[_productID].partnerIds.length--;

        //reset index to 0
        productList[_productID].partnerIdsIndex[partnerHash] = 0x0;
    }
}