// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Timelock {
    address public accountAddress;
    uint256 public amount;

    mapping(address => uint256) public lockedAmount;
    // constructor(address _accountAddress, uint256 _amount){

    // }

    function lock(address _accountAddress, uint256 _amount) public{
         
    }

    function withdraw(address _accountAddress, uint256 _amount) public{
        require( lockedAmount[_accountAddress] >= _amount);
       lockedAmount[_accountAddress] -= _amount;
       transfer
    }
}