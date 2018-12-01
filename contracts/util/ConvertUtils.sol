pragma solidity ^0.4.24;

library ConvertUtils {
    function stringToByteArray(string self) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(self);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(self, 32))
        }
    }

    function bytesArrayToUint(bytes32 self) internal pure returns (uint) {
        uint256 number;
        for(uint i = 0; i<self.length; i++) {
            number = number + uint(self[i]);
        }
        return number;
    }

    function addressToBytes(address self) internal pure returns (bytes32) {
        return bytes32(uint256(self) << 96);
    }
}