const Enums = require('../enums');

/**
 * The operation schema
 * @typedef {Object} Operation
 * @property {string} type - Set if EXPENSE OR INCOME.
 * @property {number} amount - Set the operation's amount.
 * @property {string} description - Set the description of the operation.
 */

function Wallet() {
    let balance = 0;
    const operations = [];

    this.initWallet = function() {
        const savedWallet = localStorage.getItem('wallet');
        if(!savedWallet) {
            return;
        }
        const { balance: savedBalance, operations: savedOperations } = JSON.parse(savedWallet);
        balance = savedBalance;
        operations.push(...savedOperations);
    }
    this.saveWallet = function() {
        localStorage.setItem('wallet', JSON.stringify({ balance, operations }));
    }
    /**
     * {
     *   type: 'EXPENSE',
     *   amount: 120,
     *   description: 'Bill payment'
     * }
     * @param {Operation} operation 
     */
    this.addOperation = function (operation) {
        if (!operation || !Enums.OperationsType[operation.type] || operation.amount <= 0 || !operation.description) {
            throw new Error(Enums.WalletErrors.INVALID_OPERATION);
        }
        const operationToAdd = operation;
        operationToAdd.id = new Date().getTime();
        if (operationToAdd.type === Enums.OperationsType.EXPENSE) {
            balance -= operationToAdd.amount;
        } else if (operationToAdd.type === Enums.OperationsType.INCOME) {
            balance += operationToAdd.amount;
        }
        operations.push(operationToAdd);
        this.saveWallet();
    }
    /**
     * Remove an operation from the wallet. It receives the id of the operation
     * and then removes it from the operations list.
     * @param {number} operationId
     */
    this.removeOperation = function (operationId) {
        let idToRemove = -1;
        for (let i = 0; i < operations.length; i++) {
            if (operations[i].id === operationId) {
                idToRemove = i;
                break;
            }
        }
        if (idToRemove === -1) {
            throw new Error(Enums.WalletErrors.OPERATION_NOT_FOUND);
        }
        const operation = operations[idToRemove];
        if (operation.type === Enums.OperationsType.INCOME) {
            balance -= operation.amount;
        } else if (operation.type === Enums.OperationsType.EXPENSE) {
            balance += operation.amount;
        }
        operations.splice(idToRemove, 1);
        this.saveWallet();
    }

    /**
    * Find a list of operations which descriptions match at least partially the search value.
    * @param {string} searchValue
    * @return {Array<Operation>}
    */
    this.findOperations = function (searchValue) {
        if (typeof searchValue !== 'string') {
            throw new Error(Enums.WalletErrors.INVALID_SEARCH_VALUE);
        }
        const val = searchValue.toLowerCase().trim();
        const operationsFound = [];
        for (let i = 0; i < operations.length; i++) {
            const description = operations[i].description.toLowerCase();
            if (description.indexOf(val) > -1) {
                operationsFound.push(operations[i]);
            }
        }
        return operationsFound;
    }

    /**
     * @return {number} Balance of the wallet
     */
    this.getBalance = function () {
        return balance;
    }
    /**
     * @return {Array<Operation>} Returns the operations list of the wallet
     */
    this.getOperations = function () {
        return operations;
    }

    this.initWallet();
}

module.exports = Wallet;