
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=]{9,}$/;

  if (!usernameRegex.test(username)) {
    alert('There invalid data .');
    return;
  }
  if (!passwordRegex.test(password)) {
    alert('There invalid data .');
    return;
  }

  localStorage.setItem('username', username);
  localStorage.setItem('email', username + '@example.com');
  window.location.href = 'index.html';
});
