const logoutBtn = document.querySelector('.logout');
const loginBtn = document.querySelector('.login');
const logoutDOM = document.querySelector('.logoutBtn')
const checkUser = async () => {
  const user = await getCurrentUser();
  if (user) { //if a user is logged in
    logoutBtn.style.visibility = 'visible';
    logoutBtn.style.display = 'grid';
    logoutDOM.innerHTML = `Logout, ${user.name}`;

    loginBtn.style.visibility = 'hidden';
    loginBtn.style.display = 'none';
  } else { //if no user is logged in
    loginBtn.style.visibility = 'visible';
    loginBtn.style.display = 'grid';

    logoutBtn.style.visibility = 'hidden';
    logoutBtn.style.display = 'none';
  }
}
checkUser()