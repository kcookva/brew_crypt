'use strict';

module.exports = class Transactions {
    //Transactions are important so miners don't continuously mine blocks and spam the blockchain (proof of work)
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}