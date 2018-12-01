pragma solidity ^0.4.24;

library RateModel {
    struct Rate {
        bytes32 partnerId;
        byte[] rates;
    }
}