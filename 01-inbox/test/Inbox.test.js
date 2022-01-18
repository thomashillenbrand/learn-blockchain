const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // capitalised because its a constructor function
const web3 = new Web3(ganache.provider()); // instance of a web3 library to be used
const { interface, bytecode } = require('../compile'); // getting these values out of the exported value

let accounts;
let inbox;

beforeEach(async () => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();

    console.log(accounts);

    // use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi There!'] })
        .send({ from: accounts[0], gas: '1000000' })

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox);
    });
});
