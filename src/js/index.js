const Wallet = require('./models/Wallet');

const wallet = new Wallet();

const toggleModal = () => {
    const modalElmnt = document.getElementById('modal');
    if(!modalElmnt) {
        return;
    }
    const isHidden = modalElmnt.classList.contains('hide');
    if(isHidden) {
        modalElmnt.classList.remove('hide');
        return;
    }
    modalElmnt.classList.add('hide');
}

window.toggleModal = toggleModal;