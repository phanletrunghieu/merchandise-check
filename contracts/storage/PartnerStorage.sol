pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "../model/PartnerModel.sol";
import "../util/ConvertUtils.sol";

contract PartnerStorage {
    using ConvertUtils for *;

    mapping(bytes32 => PartnerModel.Partner) public partnerList;
    bytes32[] public partnerIndex;

    function createPartner(bytes32 _id, address _address, string _name, address _supplier) public {
        uint256 newIndex = partnerIndex.length;

        partnerList[_id].id = _id;
        partnerList[_id].addr = _address;
        partnerList[_id].name = _name;
        partnerList[_id].supplier = _supplier;
        partnerList[_id].index = newIndex;

        partnerIndex.push(_id);
    }

    function getListPartners() public view returns(PartnerModel.Partner[]) {
        PartnerModel.Partner[] memory list = new PartnerModel.Partner[](partnerIndex.length);
        for (uint256 i = 0; i < partnerIndex.length; i++) {
            list[i] = partnerList[partnerIndex[i]];
        }
        return list;
    }

    function getPartner(bytes32 _id) public view returns (PartnerModel.Partner) {
        return partnerList[_id];
    }

    function deletePartner(bytes32 _id) public {
        partnerList[_id].addr = 0x0;
        uint256 toDeleteIndex = partnerList[_id].index;

        partnerIndex[toDeleteIndex] = partnerIndex[partnerIndex.length-1];
        partnerIndex.length--;

        if(partnerIndex.length > 0) {
            partnerList[partnerIndex[toDeleteIndex]].index = toDeleteIndex;
        }
    }

    function updatePartner(bytes32 _id, string _name) public {
        partnerList[_id].id = _id;
        partnerList[_id].name = _name;
    }

    function addProduct(bytes32 _id, bytes32 _productID) public {
        // prevent index == 0
        if(partnerList[_id].productIds.length == 0){
            partnerList[_id].productIds.length = 1;
        }

        partnerList[_id].productIds.push(_productID);

        uint productIDHash = _productID.bytesArrayToUint();
        if (partnerList[_id].productIdsIndex.length <= productIDHash) {
            partnerList[_id].productIdsIndex.length = productIDHash + 1;
        }
        partnerList[_id].productIdsIndex[productIDHash] = partnerList[_id].productIds.length-1;
    }

    function removeProduct(bytes32 _id, bytes32 _productID) public {
        uint productIDHash = _productID.bytesArrayToUint();
        uint256 indexToRemove = partnerList[_id].productIdsIndex[productIDHash];
        require(indexToRemove!=0x0, "product is not exist");

        partnerList[_id].productIds[indexToRemove] = partnerList[_id].productIds[partnerList[_id].productIds.length-1];

        //delete the last element from productIds
        partnerList[_id].productIds.length--;

        //reset index to 0
        partnerList[_id].productIdsIndex[productIDHash] = 0;
    }
}