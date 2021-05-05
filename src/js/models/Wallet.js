const { default: axios } = require('axios');
const Enums = require('../enums');

/**
 * The operation schema
 * @typedef {Object} Operation
 * @property {string} type - Set if EXPENSE OR INCOME.
 * @property {number} amount - Set the operation's amount.
 * @property {string} description - Set the description of the operation.
 */
class Wallet {
    constructor() {
        this.balance = 0;
        this.operations = [];
    }

    async updateWallet() {
        const { data: savedWallet } = await axios.get('http://localhost:9000/api/wallet');
        if (!savedWallet) {
            return;
        }
        const { balance: savedBalance, operations: savedOperations } = savedWallet;
        this.balance = savedBalance;
        this.operations = savedOperations;
    }
    /**
     * {
     *   type: 'EXPENSE',
     *   amount: 120,
     *   description: 'Bill payment'
     * }
     * @param {Operation} operation 
     */
    async addOperation(operation) {
        if (!operation || !Enums.OperationsType[operation.type] || operation.amount <= 0 || !operation.description) {
            throw new Error(Enums.WalletErrors.INVALID_OPERATION);
        }
        await axios.post('http://localhost:9000/api/wallet/operation', operation);
        await this.updateWallet();
    }
    /**
     * Remove an operation from the wallet. It receives the id of the operation
     * and then removes it from the operations list.
     * @param {number} operationId
     */
    async removeOperation(operationId) {
        let idToRemove = -1;
        for (let i = 0; i < this.operations.length; i++) {
            if (this.operations[i].id === operationId) {
                idToRemove = i;
                break;
            }
        }
        if (idToRemove === -1) {
            throw new Error(Enums.WalletErrors.OPERATION_NOT_FOUND);
        }
        await axios.delete(`http://localhost:9000/api/wallet/operation/${operationId}`);
        await this.updateWallet();
    }

    /**
    * Find a list of operations which descriptions match at least partially the search value.
    * @param {string} searchValue
    * @return {Array<Operation>}
    */
    findOperations(searchValue) {
        if (typeof searchValue !== 'string') {
            throw new Error(Enums.WalletErrors.INVALID_SEARCH_VALUE);
        }
        const val = searchValue.toLowerCase().trim();
        const operationsFound = [];
        for (let i = 0; i < this.operations.length; i++) {
            const description = this.operations[i].description.toLowerCase();
            if (description.indexOf(val) > -1) {
                operationsFound.push(operations[i]);
            }
        }
        return operationsFound;
    }

    /**
     * @return {number} Balance of the wallet
     */
    getBalance() {
        return this.balance;
    }
    /**
     * @return {Array<Operation>} Returns the operations list of the wallet
     */
    getOperations() {
        return this.operations;
    }

}

module.exports = Wallet;