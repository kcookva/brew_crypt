// Import modules
var SHA512 = require("crypto-js/sha512");
var readline = require('readline-sync')
var Blockchain = require('./endpoints/Blockchain.js');
var Block = require('./endpoints/Block.js');
var Transaction = require('./endpoints/Block.js');

var brewcrypt = new Blockchain();

console.log('\n\n Latest block is:', brewcrypt.getLatestBlock());
console.log('\n-----------------------------');


var userinput = readline.question('\n\nWould you like to search(search) for a block, mine a block(mine), or list all blocks(list)? - ');


if(userinput == 'mine') {

    var block1 = readline.question('\n\nEnter your blockchain address - ');
    var block2 = readline.question('\nEnter the address you are sending to - ');

    brewcrypt.createTransaction(new Transaction(block1, block2, 10));

    if(block2 == block1) {
    console.log('You cannot send transactions to yourself...');
    return process.exit();
    }

    var blockinput = readline.question('\nEnter amounts of blocks to be mined -  ');

    for(i = 0; i <= blockinput; i++) {
        console.log('\n Starting the miner...');
        brewcrypt.minePendingTransactions(block2);

        console.log('\nBalance of second address is', brewcrypt.getBalanceOfAddress(block2));
        console.log('\n Is chain valid?: ', brewcrypt.isChainValid());
    
    }
}

if(userinput == 'search') {
    brewcrypt.findBlock(userinput);
}

if(userinput == 'list') {
    console.log(brewcrypt.getAllBlocks());
}


console.log('\n\n Blockchain is:', brewcrypt.getAllBlocks());
console.log('\n-----------------------------');