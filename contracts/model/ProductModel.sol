pragma solidity ^0.4.24;

library ProductModel {
    struct Product {
        bytes32 id;
        string name;
        string description;
        string image;//ipfs hash

        uint256 index;//similar to id, but it can change

        // account can add logs
        bytes32[] partnerIds;// index => partnerID
        uint256[] partnerIdsIndex;// partnerID(hash) => index

        // relationshipp with SupplierModel
        address owner;

        // relationshipp with LogModel
        bytes32[] logIds;// index => logID
        uint256[] logIdsIndex;// logID (hash) => index
    }
}