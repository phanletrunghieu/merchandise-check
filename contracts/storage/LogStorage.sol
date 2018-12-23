pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "../model/LogModel.sol";
import "../util/ConvertUtils.sol";

contract LogStorage {
    using ConvertUtils for *;

    mapping(bytes32 => LogModel.Log) public logList;
    bytes32[] public logIndex;

    modifier isLog(bytes32 _id) {
        require(logList[_id].productId!=0x0, "this id is not a log");
        _;
    }

    modifier isNotLog(bytes32 _id) {
        require(logList[_id].productId==0x0, "this id is  a log");
        _;
    }

    function createLog(bytes32 _id, bytes32 _productId, string _description, address _addedBy, string _video, uint256 _createdAt) public {
        uint256 newIndex = logIndex.length;

        logList[_id].id = _id;
        logList[_id].productId = _productId;
        logList[_id].description = _description;
        logList[_id].addedBy = _addedBy;
        logList[_id].video = _video;
        logList[_id].createdAt = _createdAt;
        logList[_id].index = newIndex;

        logIndex.push(_id);
    }

    function getLog(bytes32 _id) public view returns (LogModel.Log) {
        return logList[_id];
    }

    function deleteLog(bytes32 _id) public {
        uint256 toDeleteIndex = logList[_id].index;

        logIndex[toDeleteIndex] = logIndex[logIndex.length-1];
        logIndex.length--;

        if(logIndex.length > 0) {
            logList[logIndex[toDeleteIndex]].index = toDeleteIndex;
        }
    }

    function setDescription(bytes32 _id, string _description) public isLog(_id) {
        logList[_id].description = _description;
    }
}