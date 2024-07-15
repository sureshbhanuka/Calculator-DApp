// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calculator {
    event Addition(address indexed sender, uint256 num1, uint256 num2, uint256 result);
    event Subtraction(address indexed sender, uint256 num1, uint256 num2, uint256 result);

    function add(uint256 num1, uint256 num2) public returns (uint256) {
        uint256 result = num1 + num2;
        emit Addition(msg.sender, num1, num2, result);
        return result;
    }

    function subtract(uint256 num1, uint256 num2) public returns (uint256) {
        uint256 result = num1 - num2;
        emit Subtraction(msg.sender, num1, num2, result);
        return result;
    }
}
