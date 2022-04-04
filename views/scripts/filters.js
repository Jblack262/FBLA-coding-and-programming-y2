const filtersContainerDOM = document.querySelector('#filters');
const toggleDropdown = document.querySelector('.toggle-dropdown');
const toggleIcon = document.querySelector('.toggle-icon');

toggleDropdown.addEventListener('click', () => {
  filtersContainerDOM.classList.toggle('open');
  toggleIcon.classList.toggle('fa-plus');
  toggleIcon.classList.toggle('fa-minus');
})