const modal = document.querySelector('.modal-container');
const modalMessage = document.querySelector('.modal-message');
const primaryBtnLink = document.querySelector('.primary');
const primaryBtn = document.querySelector('.primary-btn');

const showModal = (message, btnText, btnURL) => {
  modalMessage.innerHTML = message;
  if (!btnText && !btnURL) {
    console.log('test')
    primaryBtn.style.visibility = "hidden";
    primaryBtn.style.display = "none";
  } else {
    primaryBtnLink.innerHTML = btnText;
    primaryBtnLink.href = btnURL;
  }
  modal.style.display = 'block';
  modal.style.visibility = 'visible';
}

const hideModal = () => {
  modal.style.display = 'none';
  modal.style.visibility = 'hidden';
}