// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

 contract Lottery {
    address public manager;
    address[] public players;

    constructor () {
        manager = msg.sender; // msg is a global variable always available
    }

    function enter() public payable {
        require(msg.value >= .01 ether);
        players.push(msg.sender);
    }

    function pickWinner() public restricted {
        address winnerAddress = players[random() % players.length];
        payable(winnerAddress).transfer(address(this).balance);
        players = new address[](0);
    }

    function random() private view returns(uint){
       return uint(keccak256(abi.encode(block.difficulty, block.timestamp, players))); // block is global variable
    }

    function getPlayers() public view returns (address[] memory){
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

 }