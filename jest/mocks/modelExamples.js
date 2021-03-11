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
const INCOME_OPERATION = {
    amount: 1000,
    description: 'Salary',
    type: 'INCOME'
}
const NOT_VALID_INCOME_OPERATION = {
    amount: 100,
    description: 'Bill',
    type: 'EXPENSE'
}
module.exports = {
    EXPENSE_OPERATION: EXPENSE_OPERATION,
    INCOME_OPERATION: INCOME_OPERATION,
    NOT_VALID_INCOME_OPERATION: NOT_VALID_INCOME_OPERATION,
    NOT_VALID_EXPENSE_OPERATION: NOT_VALID_EXPENSE_OPERATION
}