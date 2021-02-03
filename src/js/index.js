let balance = 0;
const operations = [];
const OperationsType = {
    EXPENSE: 'EXPENSE',
    INCOME: 'INCOME'
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
function removeOperation() {

}
// Find operation
// Get balance
// Get operations