// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Timelock {
    struct Lock {
        uint256 amount;
        uint256 unlockTime;
    }

    mapping(address => Lock) public locked;

    function lock(uint256 _unlockTime) external payable {
        require(msg.value > 0, "Send vaild ETH");
        require(_unlockTime > block.timestamp, "unlock time cannot be less than current time");
        locked[msg.sender].amount += msg.value;
        locked[msg.sender].unlockTime = _unlockTime;
    }

    function withdraw() external {
        require(locked[msg.sender].amount > 0, "enter valid amount");
        require(block.timestamp > locked[msg.sender].unlockTime, "Funds not matured yet");

        uint256 userAmount = locked[msg.sender].amount;
        locked[msg.sender].amount = 0;

        payable(msg.sender).transfer(userAmount);
    }

    function getLockedBalance(address user) external view returns (uint256) {
        return locked[user].amount;
    }

    receive() external payable {
        revert("Use lock() to deposit ETH");
    }
}
