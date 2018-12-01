pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "../model/RateModel.sol";
import "../util/ConvertUtils.sol";

contract RateStorage {
    using ConvertUtils for *;

    mapping(bytes32 => uint8[]) public rateList;

    function rate(bytes32 _partnerId, uint8 _star) public {
        rateList[_partnerId].push(_star);
    }

    function getAverageRate(bytes32 _partnerId) public view returns(uint256 r) {
        uint8[] memory rates = rateList[_partnerId];
        for (uint256 i = 0; i < rates.length; i++) {
            r += rates[i];
        }
        r = r/rates.length;
    }

    function getRatesByPartner(bytes32 _partnerId) public view returns(uint8[]) {
        return rateList[_partnerId];
    }
}