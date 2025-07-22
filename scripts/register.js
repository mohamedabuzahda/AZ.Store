document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('register-username').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;

  const usernameRegex = /^[a-zA-Z0-9_]{5,16}$/;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=]{9,}$/;

  if (!usernameRegex.test(username)) {
    alert('There invalid data .');
    return;
  }
  if (!emailRegex.test(email)) {
    alert('There invalid data .');
    return;
  }
  if (!passwordRegex.test(password)) {
    alert('There invalid data .');
    return;
  }

  localStorage.setItem('username', username);
  localStorage.setItem('email', email);
  window.location.href = 'login.html';
});
