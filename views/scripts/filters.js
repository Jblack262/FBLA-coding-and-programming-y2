const filtersContainerDOM = document.querySelector('#filters');
const toggleDropdown = document.querySelector('.toggle-dropdown');

toggleDropdown.addEventListener('click', () => {
  filtersContainerDOM.classList.toggle('open')
})