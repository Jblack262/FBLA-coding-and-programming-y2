const modal = document.querySelector('.modal-container');
const modalMessage = document.querySelector('.modal-message');
const primaryBtn = document.querySelector('.primary');

const showModal = (message, btnText, btnURL) => {
  modalMessage.innerHTML = message;
  if (!btnText && !btnURL) {
    primaryBtn.style.visibility = "hidden";
    primaryBtn.style.display = "none";
  } else {
    primaryBtn.innerHTML = btnText;
    primaryBtn.href = btnURL;
  }
  modal.style.display = 'block';
  modal.style.visibility = 'visible';
}

const hideModal = () => {
  modal.style.display = 'none';
  modal.style.visibility = 'hidden';
}