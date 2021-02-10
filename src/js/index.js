let balance = 0;
const operations = [];
const OperationsType = {
    EXPENSE: 'EXPENSE',
    INCOME: 'INCOME'
}
const WalletErrors = {
    OPERATION_NOT_FOUND: 'OPERATION_NOT_FOUND'
}
/**
 * {
 *   type: 'EXPENSE',
 *   amount: 120,
 *   description: 'Bill payment'
 * }
 * @param {*} operation 
 */
function addOperation(operation) {
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
function removeOperation(operationId) {
    let idToRemove = -1;
    for (let i = 0; i < operations.length; i++) {
        if (operations[i].id === operationId) {
            idToRemove = i;
            break;
        }
    }
    if(idToRemove === -1) {
        throw new Error(WalletErrors.OPERATION_NOT_FOUND);
    }
    const operation = operations[idToRemove];
    if(operation.type === OperationsType.INCOME) {
        balance -= operation.amount;
    } else if(operation.type === OperationsType.EXPENSE) {
        balance += operation.amount;
    }
    operations.splice(idToRemove, 1);
}

/**
* Find a list of operations which descriptions match at least partially the search value.
* @param {string} searchValue
* @return {Array<Object>}
*/
function findOperations(searchValue) {
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
function getBalance() {
    return balance;
}
/**
 * @return {Array<Object>} Returns the operations list of the wallet
 */
function getOperations() {
    return operations;
}