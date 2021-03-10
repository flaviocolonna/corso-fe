const EXPENSE_OPERATION = {
    amount: 100,
    description: 'Bill',
    type: 'EXPENSE'
}
const NOT_VALID_EXPENSE_OPERATION = {
    amount: 0,
    description: 'Bill',
    type: 'EXPENSE'
}
module.exports = {
    EXPENSE_OPERATION: EXPENSE_OPERATION,
    NOT_VALID_EXPENSE_OPERATION: NOT_VALID_EXPENSE_OPERATION
}