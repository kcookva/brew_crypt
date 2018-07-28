'use strict';

// Import modules
var uuid = require('random-uuid');
const SHA512 = require("crypto-js/sha512");
var readline = require('readline-sync');
var Blockchain = require('./Blockchain.js');
var localip = require('local-ip');


module.exports = class Block {

    constructor(timestamp, transactions, previousHash, address) {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
        this.address = localip('wlo1', function(err, res) {return res; });
    }

    calculateHash() {
        return SHA512(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}
