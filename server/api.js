const fastify = require('fastify')({
    logger: true
});
const database = require('quick.db');
const { isValidOperation, WalletErrors, OperationsType } = require('./helpers');
const WALLET_DB_ENTITY = 'wallet';
const initialWalletState = { operations: [], balance: 0 };

const initWallet = () => {
    if (!database.get(WALLET_DB_ENTITY)) {
        database.set(WALLET_DB_ENTITY, initialWalletState);
    }
}
const addOperationHandler = function (req, res) {
    const { body: operationToAdd } = req;
    fastify.log.info(operationToAdd)
    if (!isValidOperation(operationToAdd)) {
        res.code(400);
        res.send({ error: WalletErrors.INVALID_OPERATION });
        return;
    }
    const currentMS = new Date().getTime();
    const operation = {
        ...operationToAdd,
        date: currentMS,
        id: currentMS
    };
    let balance = database.get(`${WALLET_DB_ENTITY}.balance`);
    if (operation.type === OperationsType.EXPENSE) {
        balance -= operation.amount;
    } else if (operation.type === OperationsType.INCOME) {
        balance += operation.amount;
    }
    database.push(`${WALLET_DB_ENTITY}.operations`, operation);
    database.set(`${WALLET_DB_ENTITY}.balance`, balance);
    res.code(201);
    res.send(operation);
}
const removeOperationHandler = function (req, res) {
    const { params: { id: idToRemove } } = req;
    const operations = database.get(`${WALLET_DB_ENTITY}.operations`);
    const foundIndex = operations.findIndex(({ id }) => id === parseInt(idToRemove));
    if(foundIndex === -1) {
        res.code(404);
        res.send();
        return;
    }
    const operation = operations[foundIndex];
    let balance = database.get(`${WALLET_DB_ENTITY}.balance`);
    if (operation.type === OperationsType.INCOME) {
        balance -= operation.amount;
    } else if (operation.type === OperationsType.EXPENSE) {
        balance += operation.amount;
    }
    operations.splice(foundIndex, 1);
    database.set(`${WALLET_DB_ENTITY}.balance`, balance);
    database.set(`${WALLET_DB_ENTITY}.operations`, operations);
    res.send();
}
const getWalletHandler = function (req, res) {
    const savedWallet = database.get(WALLET_DB_ENTITY);
    res.send(savedWallet);
}
initWallet();
module.exports = function (fastify, opts, done) {
    fastify.get('/wallet', getWalletHandler);
    fastify.post('/wallet/operation', addOperationHandler);
    fastify.delete('/wallet/operation/:id', removeOperationHandler);
    done();
}