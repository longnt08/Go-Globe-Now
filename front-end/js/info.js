document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem('username');
  if (username) {
      document.getElementById("username").textContent = username;
  } else {
      alert("User not logged in");
  }
});

document.getElementById('loginBtn').addEventListener("click", function () {
  window.location.href = 'http://127.0.0.1:5500/front-end/login.html'
})

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
    }px;`
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
      }px; `
    );
  }
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

// update user info
document.getElementById('saveChange').addEventListener('click', (e) => {
  e.preventDefault();
  
  const user_id = localStorage.getItem('user_id');

  let dob = document.querySelector('input[name="dob"]').value;
  if (dob) {
    const [year, month, day] = dob.split("-");
    dob = `${day}-${month}-${year}`;
  }

  const changed_info = {
    first_name: document.getElementById('firstName').value,
    last_name: document.getElementById('lastName').value,
    gender: document.querySelector('select[name="gender"]').value,
    birthday: dob,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value,
    user_id: user_id
  };

  fetch('http://127.0.0.1:5000/users/update_user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    // credentials: 'include',
    body: JSON.stringify(changed_info)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.success) {
      alert("User updated successfully");
    } else {
      alert(data.message);
    }
  })
  .catch(error => console.error("Failed to update user info:", error));
})

// show saved tours
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
    const tourList = document.getElementById('myService_DichVuDaLuu');
      tours.forEach(tour => {

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

        // them nut xoa tour
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Xóa";
        deleteBtn.classList.add("myService_Delete");
        deleteBtn.onclick = () => {
          delete_saved_tour();
        }

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

// show registered tours
function showRegisteredTours () {
  const user_id = localStorage.getItem('user_id');

  fetch(`http://127.0.0.1:5000/tours/get_registered_tours?user_id=${user_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then((tours) => {

    const tourList = document.getElementById('myService_DichVuDaDK');
    
    tours.forEach(tour => {

      const tourDiv = document.createElement('div');
      tourDiv.classList.add('myService_DichVuDaDK');
    
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

      // them thong tin ngay di
      const startDate = document.createElement('p');
      startDate.textContent = `Ngày đi: ${tour.startDate}`;
      tourDiv.appendChild(startDate);

      // them nut xoa tour
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "Xóa";
      deleteBtn.classList.add("myService_Delete");
      deleteBtn.onclick = () => {
        delete_from_info(tour._id);
      }

      // them nut sua ngay di
      const updateStartDate = document.createElement('button');
      updateStartDate.textContent = 'Sửa ngày đi';
      updateStartDate.classList.add('myService_info');
      updateStartDate.onclick = () => {
        update_start_date(tour._id);
      }

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('btn-container');
      
      buttonContainer.appendChild(updateStartDate);
      buttonContainer.appendChild(deleteBtn);

      tourDiv.appendChild(buttonContainer);

      tourList.appendChild(tourDiv);
  });
  })
  .catch((error) => console.error("Error fetching tours:", error));
}

// xoa tour khoi muc da luu
function delete_saved_tour() {

  const user_id = localStorage.getItem('user_id');
  const tour_id = localStorage.getItem('saved_tour_id');

  const id_data = {
    tour_id: tour_id,
    user_id: user_id
  }

  fetch('http://127.0.0.1:5000/tours/delete_saved_tour', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(id_data)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
        alert(data.success);
        window.location.href = 'http://127.0.0.1:5500/front-end/info.html'
      } else {
        alert(data.message);
      }
  })
  .catch(error => console.error('Error:', error));
}


document.addEventListener("DOMContentLoaded", function () {
  showSavedTours();
  showRegisteredTours();
})