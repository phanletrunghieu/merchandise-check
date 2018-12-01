pragma solidity ^0.4.24;

library LogModel {
    struct Log {
        bytes32 id;
        string description;
        uint256 createdAt;
        string video;//link

        uint256 index;//similar to id, but it can change

        // relationshipp with ProductModel
        bytes32 productId;
    }
}