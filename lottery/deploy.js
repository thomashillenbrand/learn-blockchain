const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    'surge middle ticket track renew old rice rib deal symbol today include',
    'https://rinkeby.infura.io/v3/6495c7741ec34a90aa51087cd888283c'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts(); // provider auto generates account addresses bsed on mnemonic

    console.log('Attempting to deploy from account:', accounts[0]);
    const result = await new web3.eth.Contract(abi) // grabbed form the compile.js file...
        .deploy({ data: evm.bytecode.object })
        .send({ gas: '1000000', from: accounts[0] });

    console.log(abi);
    console.log('Contract deployed to: ', result.options.address);
    provider.engine.stop();
};

deploy();
return;