const OperationsType = {
    EXPENSE: 'EXPENSE',
    INCOME: 'INCOME'
}
const WalletErrors = {
    OPERATION_NOT_FOUND: 'OPERATION_NOT_FOUND',
    INVALID_OPERATION: 'INVALID_OPERATION',
    INVALID_SEARCH_VALUE: 'INVALID_SEARCH_VALUE'
}
const isValidOperation = (operation) => {
    return operation && OperationsType[operation.type] && parseFloat(operation.amount) > 0 && operation.description;
}

module.exports = {
    isValidOperation,
    OperationsType,
    WalletErrors,
}