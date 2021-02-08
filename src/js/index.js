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
    if(operationToAdd.type === OperationsType.EXPENSE) {
        balance = balance - operationToAdd.amount;
    } else if(operationToAdd.type === OperationsType.INCOME) {
        balance = balance + operationToAdd.amount;
    }
    operations.push(operationToAdd);
}
/**
 * Remove an operation from the wallet. It receives the id of the operation
 * and then removes it from the operations list.
 * @param {number} id
 */
function removeOperation(id) {
    let idToRemove = -1;
    for(var i = 0; i < operations.length; i++) {
        if(operations[i].id === id) {
            idToRemove = i;
            break;
        }
    }
    if(idToRemove === -1) {
        throw new Error(WalletErrors.OPERATION_NOT_FOUND);
    }
    const operation = operations[idToRemove];
    if(operation.type === OperationsType.IN) {
        balance =  balance - operation.amount;
    } else if(operation.type === OperationsType.OUT) {
        balance = balance + operation.amount;
    }
    operations.splice(idToRemove, 1);
}

/*
* Find a list of operations which descriptions match at least partially the search value. 
*/
function findOperation(searchValue) {
    const val = searchValue.toLowerCase().trim();
    const operationsFound = [];
    for(var i = 0; i < operations.length; i++) {
        const description = operations[i].description.toLowerCase();
        if(description.indexOf(val) > -1) {
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