function openAndCloseMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  }
  
function check_login() {
  if(!localStorage.getItem('username') || !localStorage.getItem('user_id')) {
    alert('You are not log in. Please log in to your account');
    window.location.href = 'http://127.0.0.1:5500/front-end/login.html'
  } else {
    window.location.href = 'http://127.0.0.1:5500/front-end/info.html';
  }
}