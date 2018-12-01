pragma solidity ^0.4.24;

library SupplierModel {
    struct Supplier {
        address addr;
        string name;

        uint256 index;

        bytes32[] productIds;// index => productID
        uint256[] productIdsIndex;// productID(hash) => index

        bytes32[] partnerIds;// index => partnerID
        uint256[] partnerIdsIndex;// partnerID(hash) => index
    }
}