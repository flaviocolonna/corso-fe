/**
 * The operation schema
 * @typedef {Object} Operation
 * @property {string} type - Set if EXPENSE OR INCOME.
 * @property {number} amount - Set the operation's amount.
 * @property {string} description - Set the description of the operation.
 */
// IIFE
(function () {
    let balance = 0;
    const operations = [];
    const WalletErrors = {
        OPERATION_NOT_FOUND: 'OPERATION_NOT_FOUND',
        INVALID_OPERATION: 'INVALID_OPERATION',
        INVALID_SEARCH_VALUE: 'INVALID_SEARCH_VALUE'
    }
    /**
     * {
     *   type: 'EXPENSE',
     *   amount: 120,
     *   description: 'Bill payment'
     * }
     * @param {Operation} operation 
     */
    this.addOperation = function(operation) {
        // 1. Estrarre questa validazione in un'altra funzione che prenda come parametro l'operazione
        // e restituisca true o false
        // 2. Personalizzare l'errore
        // 3. Aggiungere validazione in altre funzioni che reputi opportune
        // 4. Esporta correttamente le funzioni nel contesto padre
        if(!operation || !OperationsType[operation.type] || operation.amount <= 0 || !operation.description) {
            throw new Error(WalletErrors.INVALID_OPERATION);
        }
        const operationToAdd = operation;
        operationToAdd.id = new Date().getTime();
        if (operationToAdd.type === OperationsType.EXPENSE) {
            balance -= operationToAdd.amount;
        } else if (operationToAdd.type === OperationsType.INCOME) {
            balance += operationToAdd.amount;
        }
        operations.push(operationToAdd);
    }
    /**
     * Remove an operation from the wallet. It receives the id of the operation
     * and then removes it from the operations list.
     * @param {number} operationId
     */
    this.removeOperation = function(operationId) {
        let idToRemove = -1;
        for (let i = 0; i < operations.length; i++) {
            if (operations[i].id === operationId) {
                idToRemove = i;
                break;
            }
        }
        if (idToRemove === -1) {
            throw new Error(WalletErrors.OPERATION_NOT_FOUND);
        }
        const operation = operations[idToRemove];
        if (operation.type === OperationsType.INCOME) {
            balance -= operation.amount;
        } else if (operation.type === OperationsType.EXPENSE) {
            balance += operation.amount;
        }
        operations.splice(idToRemove, 1);
    }

    /**
    * Find a list of operations which descriptions match at least partially the search value.
    * @param {string} searchValue
    * @return {Array<Operation>}
    */
    this.findOperations = function(searchValue) {
        if(typeof searchValue !== 'string') {
            throw new Error(WalletErrors.INVALID_SEARCH_VALUE);
        }
        if(!searchValue) {
            return [];
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
    this.getBalance = function() {
        return balance;
    }
    /**
     * @return {Array<Operation>} Returns the operations list of the wallet
     */
    this.getOperations = function() {
        return operations;
    }

})();

const OperationsType = {
    EXPENSE: 'EXPENSE',
    INCOME: 'INCOME'
}