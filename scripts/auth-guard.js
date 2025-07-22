(function() {
  const allowed = ['login.html', 'register.html'];
  const path = window.location.pathname.split('/').pop();
  if (!allowed.includes(path)) {
    const username = localStorage.getItem('username');
    if (!username) {
      window.location.href = 'register.html';
    }
  }
})();
