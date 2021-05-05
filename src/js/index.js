import 'regenerator-runtime/runtime';
const Wallet = require('./models/Wallet');

const wallet = new Wallet();
const toggleModal = () => {
    const modalElmnt = document.getElementById('modal');
    if (!modalElmnt) {
        return;
    }
    const isHidden = modalElmnt.classList.contains('hide');
    if (isHidden) {
        modalElmnt.classList.remove('hide');
        return;
    }
    modalElmnt.classList.add('hide');
}
const checkFormValidity = (form, forceReset = false) => {
    const { amount: amountInput, description: descriptionInput } = form;
    if (amountInput.checkValidity() || forceReset) {
        amountInput.parentNode.classList.remove('has-error');
    } else {
        amountInput.parentNode.classList.add('has-error');
    }
    if (descriptionInput.checkValidity() || forceReset) {
        descriptionInput.parentNode.classList.remove('has-error');
    } else {
        descriptionInput.parentNode.classList.add('has-error');
    }
}
const addOperation = async (event) => {
    event.preventDefault();
    const btnSubmit = event.target;
    const type = btnSubmit.getAttribute('data-type');
    const formElmnt = btnSubmit.closest('form');
    const { amount: { value: amount }, description: { value: description } } = formElmnt;
    const operation = {
        amount: parseFloat(amount),
        description: description.trim(),
        type,
    }
    try {
        await wallet.addOperation(operation);
        formElmnt.reset();
        checkFormValidity(formElmnt, true);
        toggleModal();
        updateOperationsTable();
    } catch (e) {
        console.error(e);
        checkFormValidity(formElmnt);
    }
}
const removeOperation = async (id) => {
    try {
        await wallet.removeOperation(id);
        updateOperationsTable();
    } catch (e) {
        console.log(e);
    }
}
const getDeleteActionBtn = (operation) => {
    const actionCell = document.createElement('td');
    actionCell.className = 'align-text-center';
    const actionButton = document.createElement('button');
    actionButton.className = 'button button-icon button-animated icon-delete';
    actionButton.onclick = function () {
        removeOperation(operation.id);
    }
    actionCell.appendChild(actionButton);
    return actionCell;
}
const getOperationsRow = (operation) => {
    const tableRow = document.createElement('tr');
    tableRow.setAttribute('data-op-type', operation.type.toLowerCase());
    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = operation.description;
    const amountCell = document.createElement('td');
    amountCell.className = 'operation-amount';
    amountCell.textContent = parseFloat(operation.amount).toLocaleString();
    const dateCell = document.createElement('td');
    dateCell.textContent = new Date(operation.date).toLocaleString();
    tableRow.appendChild(descriptionCell);
    tableRow.appendChild(amountCell);
    tableRow.appendChild(dateCell);
    tableRow.appendChild(getDeleteActionBtn(operation));
    return tableRow;
}
const updateOperationsTable = (operationsToShow = wallet.getOperations()) => {
    const operations = Array.from(operationsToShow);
    const tableContainerElmnt = document.getElementById('table-container');
    const tableBody = tableContainerElmnt.querySelector('#table-body');
    updateBalance();
    if (!operations.length) {
        tableContainerElmnt.classList.add('no-data');
        return;
    }
    tableContainerElmnt.classList.remove('no-data');
    tableBody.innerHTML = '';
    operations.forEach(function (operation) {
        tableBody.appendChild(getOperationsRow(operation));
    });
}
const updateBalance = () => {
    const balanceElmnt = document.getElementById('balance-box');
    balanceElmnt.textContent = wallet.getBalance();
}
/**
 * It shows or hides the reset button.
 * @name onSearchInputChange
 * @function
 * @memberof UIMethods
 * @param {MouseEvent} event - Event received on search input value change
 */
const onSearchInputChange = function (event) {
    const { value: searchValue } = event.target;
    const resetSearchElmnt = document.getElementById('reset-search-btn');
    if (!searchValue) {
        resetSearchElmnt?.classList.add('hide');
        return;
    }
    resetSearchElmnt?.classList.remove('hide');
};
/**
 * Invoke it to restore the search and the operations table
 * @name resetSearch
 * @function
 * @memberof UIMethods
 * @void
 * @param {MouseEvent} event - Event passed from the mouse click
 */
const resetSearch = function (event) {
    event.preventDefault();
    const { target } = event;
    const formElement = target.closest('form');
    if (!formElement) {
        return;
    }
    target?.classList.add('hide');
    formElement.reset();
    updateOperationsTable();
};
/**
 * Invoke it to perform a search in the wallet.
 * It matches the search term with the description.
 * @name searchOperation
 * @function
 * @memberof UIMethods
 * @void
 * @param {MouseEvent} event - Event passed from the mouse click
 */
const searchOperation = function (event) {
    event.preventDefault();
    const {
        searchInput: { value },
    } = event.target;
    const operationsToAdd = wallet.findOperations(value);
    updateOperationsTable(operationsToAdd);
};
window.addOperation = addOperation;
window.toggleModal = toggleModal;
window.searchOperation = searchOperation;
window.resetSearch = resetSearch;
window.onSearchInputChange = onSearchInputChange;

window.addEventListener('DOMContentLoaded', async function () {
    await wallet.updateWallet();
    updateOperationsTable();
});