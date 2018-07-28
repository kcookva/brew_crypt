//Important note!...
//Do NOT run this with nodemon as it will NOT work correctly (for some reason)


// Import modules
var SHA512 = require("crypto-js/sha512");
var readline = require('readline-sync')
var Blockchain = require('./endpoints/Blockchain.js');
var Block = require('./endpoints/Block.js');
var Transaction = require('./endpoints/Block.js');
var localip = require('local-ip');

var brewcrypt = new Blockchain();


var userinput = readline.question('\n\nWould you like to search(search) for a block, mine a transaction(mine), or list all blocks(list)? - ');


if(userinput == 'mine') {

    var fromAddress = readline.question('\n\nEnter your blockchain address - ');
    var toAddress = readline.question('\nEnter the address you are sending to - ');

    brewcrypt.createTransaction(new Transaction(fromAddress, toAddress, amount));

    var amount = readline.question('\nEnter the amount to send - ');

    if(fromAddress == toAddress) {
    console.log('You cannot send transactions to yourself...');
    return process.exit();
    }

    for(i = 0; i <= 1; i++) {
        console.log('\n Starting the miner...');
        brewcrypt.minePendingTransactions(toAddress);

        console.log('\nBalance of your address is', brewcrypt.getBalanceOfAddress(fromAddress));
        console.log('\nBalance of the receiving address is', brewcrypt.getBalanceOfAddress(toAddress));
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
