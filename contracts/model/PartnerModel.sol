pragma solidity ^0.4.24;

library PartnerModel {
    struct Partner {
        bytes32 id;
        address addr;
        string name;

        uint256 index;

        address supplier;

        bytes32[] productIds;// index => productID
        uint256[] productIdsIndex;// productID(hash) => index
    }
}