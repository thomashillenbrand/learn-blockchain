// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

 contract Lottery {
    address public manager;
    address payable[] public players;

    constructor () {
        manager = msg.sender; // msg is a global variable always available
    }

    function enter() public payable {
        require(msg.value >= .01 ether);
        players.push(payable(msg.sender));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }

    function random() private view returns(uint){
       return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players))); // block is global variable
    }

    function getPlayers() public view returns (address payable[] memory){
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

 }