const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // capitalised because its a constructor function
const web3 = new Web3(ganache.provider()); // instance of a web3 library to be used

class Car {
    park = () => ('stopped');
    drive = () => ('vroom');
}

let car;

beforeEach(() => {
    car = new Car();
});

describe('Car', () => {
    it('car parks', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('car drives', () => {
        assert.equal(car.drive(), 'vroom');
    });
});
