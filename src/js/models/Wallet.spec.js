const Wallet = require('./Wallet');
const ModelExamples = require('../../../jest/mocks/modelExamples');

describe('Wallet: testing suite', function () {
    it('Wallet: instance must contain the correct initial state', function () {
        const wallet = new Wallet();
        expect(wallet.getBalance()).toBe(0);
        expect(wallet.getOperations().length).toBe(0);
    });
    it('Wallet: add valid expense operation', function () {
        const wallet = new Wallet();
        const operation = ModelExamples.EXPENSE_OPERATION;
        wallet.addOperation(operation);
        const operationAdded = wallet.getOperations()[0];
        expect(wallet.getBalance()).toBe(-100);
        expect(operationAdded.description).toBe(operation.description);
        expect(wallet.getOperations().length).toBe(1);
    });
    it('Wallet: add invalid expense operation', function () {
        const wallet = new Wallet();
        const operation = ModelExamples.NOT_VALID_EXPENSE_OPERATION;
        try {
            wallet.addOperation(operation);
        } catch (e) {
            expect(e.message).toBe('INVALID_OPERATION');
        }
    });
});