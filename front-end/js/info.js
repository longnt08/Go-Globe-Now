document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem('username');
  if (username) {
      document.getElementById("username").textContent = username;
  } else {
      alert("User not logged in. Redirecting to login page.");
  }
});

let accounts = document.querySelector(".accounts");
let option = document.querySelector(".option");
let action = document.querySelector(".action");
let All = document.querySelector(".All");
let Menu = Array.from(All.children);
accounts.setAttribute(
  "style",
  `width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
);
option.setAttribute("style", `height: ${window.innerHeight - 150}px`);
Menu.push(action);
for (let i = 0; i < Menu.length; i++) {
  Menu[i].setAttribute(
    "style",
    `width: ${window.innerWidth - 460}px; height: ${
      window.innerHeight - 150
    }px; left: ${i * (window.innerWidth - 460)}px;`
  );
}
window.addEventListener("resize", function () {
  accounts.setAttribute(
    "style",
    `width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
  );
  option.setAttribute("style", `height: ${window.innerHeight - 150}px`);
  for (let i = 0; i < Menu.length; i++) {
    Menu[i].setAttribute(
      "style",
      `width: ${window.innerWidth - 460}px; height: ${
        window.innerHeight - 150
      }px; left: ${i * (window.innerWidth - 460)}px;`
    );
  }
  All.setAttribute(
    "style",
    `top: 0px; left: ${-ChiMuc * (window.innerWidth - 460)}px;`
  );
});

// chức năng log out
async function logout() {
  if (!localStorage.getItem('username') || !localStorage.getItem('user_id')) {
    alert('You are not logged in');
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:5000/users/logout')

    if (!response) throw new Error('Logout failed');

    const data = await response.json();

    if (data.message === "Log out successful") {
      localStorage.removeItem('username');
      localStorage.removeItem('user_id');
      alert(data.message);
      window.location.href = 'http://127.0.0.1:5500/front-end/index.html';
    } else {
      alert('Failed to log out, please try again');
    }
  } catch(error) {
    console.error("Error: ", error);
    alert('An error occurred. Please try again');
  }
}

// const tourDiv = document.createElement('div');
// tourDiv.classList.add('myService_CacDichVu');

// hàm tạo tour
function create_tour(tour) {

  const tourDiv = document.createElement('div');
  tourDiv.classList.add('myService_DichVu');

  // tao the h3 cho ten tour
  const name = document.createElement('h3');
  name.textContent = tour.name;
  // tao the img cho tour
  const img = document.createElement('img');
  img.src = tour.img;
  img.alt = tour.name;
  //tao the p cho gia tour
  const price = document.createElement('p');
  price.textContent = `Giá: ${tour.price} VNĐ`;

  //them cac thanh phan vao tour
  tourDiv.appendChild(name);
  tourDiv.appendChild(img);
  tourDiv.appendChild(price);

  return tourDiv;
}

function showSavedTours() {
  user_id = localStorage.getItem('user_id');

  fetch(`http://127.0.0.1:5000/tours/get_saved_tours?user_id=${user_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then((tours) => {
    const tourList = document.getElementById('myService_CacDichVu');
      tours.forEach(tour => {
        const tourDiv = create_tour(tour);

        // them nut xoa tour
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Xóa";
        deleteBtn.classList.add("myService_Delete");
        deleteBtn.onclick = () => {
          delete_from_info(tour._id);
        }
        // tourDiv.appendChild(deleteBtn);

        // them nut dang ky
        const registerBtn = document.createElement('button');
        registerBtn.textContent = 'Đăng ký';
        registerBtn.classList.add('myService_info');
        registerBtn.onclick = () => {
          window.location.href = `http://127.0.0.1:5500/front-end/tour_payment.html?tour_id=${tour._id}`;
        }

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('btn-container');
        
        buttonContainer.appendChild(registerBtn);
        buttonContainer.appendChild(deleteBtn);

        tourDiv.appendChild(buttonContainer);

        tourList.appendChild(tourDiv);
    });
  })
  .catch((error) => console.error("Error fetching tours:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  showSavedTours();
})