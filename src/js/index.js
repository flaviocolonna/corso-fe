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
    if(amountInput.checkValidity() || forceReset) {
        amountInput.parentNode.classList.remove('has-error');
    } else {
        amountInput.parentNode.classList.add('has-error');
    }
    if(descriptionInput.checkValidity() || forceReset) {
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
    }
    try {
        wallet.addOperation(operation);
        formElmnt.reset();
        checkFormValidity(formElmnt, true);
        toggleModal();
    } catch (e) {
        console.error(e);
        checkFormValidity(formElmnt);
    }
}

window.addOperation = addOperation;
window.toggleModal = toggleModal;