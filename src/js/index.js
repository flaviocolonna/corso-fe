const Wallet = require('./models/Wallet');

const wallet = new Wallet();

console.log(wallet.getBalance());