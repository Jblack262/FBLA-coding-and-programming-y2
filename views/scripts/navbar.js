const openButtonDOM = document.querySelector('.openButton');
const closeButtonDOM = document.querySelector('.closeButton');

const navContainerDOM = document.querySelector('.navContainer');

openButtonDOM.addEventListener('click', () => {
  navContainerDOM.classList.toggle('open');
  navContainerDOM.classList.toggle('closed');
})

closeButtonDOM.addEventListener('click', () => {
  navContainerDOM.classList.toggle('open');
  navContainerDOM.classList.toggle('closed');
})