document.addEventListener("DOMContentLoaded", function () {
 
  const username = localStorage.getItem("username") ;
  const email = localStorage.getItem("email") ;
  document.getElementById("profile-username").textContent = username;
  document.getElementById("profile-email").textContent = email;
});
