const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // capitalised because its a constructor function
const web3 = new Web3(ganache.provider()); // instance of a web3 library to be used
const { interface, bytecode } = require('../compile'); // getting these values out of the exported value

let accounts;
let inbox;
const defaultMessage = "Default Message";

beforeEach(async () => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [defaultMessage] })
        .send({ from: accounts[0], gas: '1000000' })

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('sets a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, defaultMessage);
    });

    it('updates message with setMessage method', async () => {
        await inbox.methods.setMessage("new message").send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'new message');
    });
});
