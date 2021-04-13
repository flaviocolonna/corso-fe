const Wallet = require("./Wallet");
const Enums = require("../enums");
const mockedStructures = require("../../../jest/mocks/modelExamples");

describe("Wallet testing suite", function () {
    it("First instance should be an empty Wallet", function () {
        const wallet = new Wallet();
        expect(wallet.getBalance()).toBe(0);
        expect(wallet.getOperations().length).toBe(0);
    });
    it("addOperation: it works with an income operation", function () {
        const wallet = new Wallet();
        const operation = mockedStructures.INCOME_OPERATION;
        wallet.addOperation(operation);
        expect(wallet.getBalance()).toBe(operation.amount);
        expect(wallet.getOperations().length).toBe(1);
    });
    it("addOperation: it works with an outcome operation", function () {
        const wallet = new Wallet();
        const operation = mockedStructures.EXPENSE_OPERATION;
        wallet.addOperation(operation);
        expect(wallet.getBalance()).toBe(-operation.amount);
        expect(wallet.getOperations().length).toBe(1);
    });
    it("addOperation: it fires an error when adding an invalid operation", function () {
        const wallet = new Wallet();
        try {
            wallet.addOperation(mockedStructures.NOT_VALID_EXPENSE_OPERATION);
        } catch(e) {
            expect(e.message).toBe(Enums.WalletErrors.INVALID_OPERATION);
        }
    });
    it("removeOperation: it works removing an income operation", function () {
        const wallet = new Wallet();
        const operation = mockedStructures.INCOME_OPERATION;
        wallet.addOperation(operation);
        const lastOperationAdded = wallet.getOperations()[0];
        wallet.removeOperation(lastOperationAdded.id);
        expect(wallet.getBalance()).toBe(0);
        expect(wallet.getOperations().length).toBe(0);
    });
    it("removeOperation: it works removing an outcome operation", function () {
        const wallet = new Wallet();
        const operation = mockedStructures.EXPENSE_OPERATION;
        wallet.addOperation(operation);
        const lastOperationAdded = wallet.getOperations()[0];
        wallet.removeOperation(lastOperationAdded.id);
        expect(wallet.getBalance()).toBe(0);
        expect(wallet.getOperations().length).toBe(0);
    });
    it("removeOperation: it fires the correct error when date/id not found", function () {
        const wallet = new Wallet();
        try {
            wallet.removeOperation(242389239);
        } catch(e) {
            expect(e.message).toBe(Enums.WalletErrors.OPERATION_NOT_FOUND);
        }
    });
    it("findOperation: it works finding a correct operation passing a search value", function () {
        const wallet = new Wallet();
        const operation = mockedStructures.INCOME_OPERATION;
        wallet.addOperation(operation);
        const searchValue = operation.description.substring(0, 2);
        const operationsFound = wallet.findOperations(searchValue);
        expect(operationsFound.length).toBe(1);
    });
});