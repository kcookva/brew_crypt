// BrewCrypt


const SHA512 = require("crypto-js/sha512");
var readline = require('readline-sync');

//Transactions are important so miners don't continously mine blocks (proof of work)
class Transaction {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
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


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 10;
    }

    createGenesisBlock() {
        return new Block(Date.now(), [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    getAllBlocks() {
        return this.chain;
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(address1, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let brewcrypt = new Blockchain();

console.log('\n\n Latest block is:', brewcrypt.getLatestBlock());
console.log('\n-----------------------------');


var address1 = readline.question('\n\nEnter your blockchain address - ');
var address2 = readline.question('\nEnter the address you are sending to - ');

brewcrypt.createTransaction(new Transaction(address1, address2, 10));

if(address2 == address1) {
    console.log('You cannot send transactions to yourself...');
    return process.exit();
}

var blockinput = readline.question('Enter amounts of transaction blocks to be mined -  ');

for(i = 0; i <= blockinput; i++) {
    console.log('\n Starting the miner...');
    brewcrypt.minePendingTransactions(address2);

    console.log('\nBalance of second address is', brewcrypt.getBalanceOfAddress(address2));
    console.log('\n Is chain valid?: ', brewcrypt.isChainValid());
}

console.log('\n\n Blockchain is:', brewcrypt.getAllBlocks());
console.log('\n-----------------------------');