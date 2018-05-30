const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock];
    }

    createGenesisBlock() {
        return new Block(0, '30/05/2018', "Genesis Block", '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let brewcrypt = new Blockchain();
brewcrypt.addBlock(new Block(1, '30/05/2018', {amount: 4}));
brewcrypt.addBlock(new Block(2, '31/05/2018', {amount: 10}));

console.log('Is blockchain valid? ' + brewcrypt.isChainValid());

//brewcrypt.chain[1].data = {amount: 100}; // returns false because there is no matching hash (this is to test the immutability of this blockchain)
//brewcrypt.chain[1].hash = brewcrypt.chain[1].calculateHash(); // this is an attempt to recreate the hash and it still returns false (which is good)

console.log('Is blockchain valid? ' + brewcrypt.isChainValid());


console.log(JSON.stringify(brewcrypt, null, 3));