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
const addOperation = (event) => {
    event.preventDefault();
    const btnSubmit = event.target;
    const type = btnSubmit.getAttribute('data-type');
    const formElmnt = btnSubmit.closest('form');
    const { amount: { value: amount }, description: { value: description } } = formElmnt;
    const operation = {
        amount: parseFloat(amount),
        description,
        type,
        date: new Date().getTime()
    }
    try {
        wallet.addOperation(operation);
        formElmnt.reset();
        checkFormValidity(formElmnt, true);
        toggleModal();
        updateOperationsTable();
    } catch (e) {
        console.error(e);
        checkFormValidity(formElmnt);
    }
}
const removeOperation = (id) => {
    try {
        wallet.removeOperation(id);
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
    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = operation.description;
    const amountCell = document.createElement('td');
    amountCell.textContent = parseFloat(operation.amount).toLocaleString();
    const dateCell = document.createElement('td');
    dateCell.textContent = new Date(operation.date).toLocaleString();
    tableRow.appendChild(descriptionCell);
    tableRow.appendChild(amountCell);
    tableRow.appendChild(dateCell);
    tableRow.appendChild(getDeleteActionBtn(operation));
    return tableRow;
}
const updateOperationsTable = () => {
    const operations = wallet.getOperations();
    const tableContainerElmnt = document.getElementById('table-container');
    const tableBody = tableContainerElmnt.querySelector('#table-body');
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

window.addOperation = addOperation;
window.toggleModal = toggleModal;

window.addEventListener('DOMContentLoaded', function () {
    updateOperationsTable();
});