// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Timelock.sol";

contract TimelockTest is Test {
    Timelock public timelock;
    address public user = address(1);

    function setUp() public {
        timelock = new Timelock();
        vm.deal(user, 10 ether);
    }

    function test_LockFunds() public {
        vm.prank(user);
        timelock.lock{value: 1 ether}(block.timestamp + 1000);

        (uint256 amount, uint256 unlockTime) = timelock.locked(user);
        assertEq(amount, 1 ether);
        assertEq(unlockTime, block.timestamp + 1000);
    }

    function test_Revert_When_LockWithoutValue() public {
        vm.prank(user);
        vm.expectRevert("Send vaild ETH");
        timelock.lock{value: 0}(block.timestamp + 1000);
    }

    function test_Revert_When_LockWithPastTime() public {
        vm.warp(1000);
        vm.prank(user);
        vm.expectRevert("unlock time cannot be less than current time");
        timelock.lock{value: 1 ether}(999);
    }

    function test_Revert_When_WithdrawTooEarly() public {
        vm.prank(user);
        timelock.lock{value: 1 ether}(block.timestamp + 1000);

        vm.prank(user);
        vm.expectRevert("Funds not matured yet");
        timelock.withdraw();
    }

    function test_WithdrawAfterUnlock() public {
        vm.deal(address(timelock), 1 ether); // Fund contract in case of weird edge cases (optional safety)

        vm.prank(user);
        timelock.lock{value: 1 ether}(block.timestamp + 100);

        vm.warp(block.timestamp + 101);

        uint256 balanceBefore = user.balance;

        vm.prank(user);
        timelock.withdraw();

        uint256 balanceAfter = user.balance;

        assertEq(balanceAfter, balanceBefore + 1 ether);
    }

    function test_Revert_When_WithdrawWithoutLock() public {
        vm.prank(user);
        vm.expectRevert("enter valid amount");
        timelock.withdraw();
    }
}
