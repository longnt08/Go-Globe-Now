function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

// hàm tạo tour
function createTour(tour) {
  // Tạo div cho từng tour
  const tourDiv = document.createElement("div");
  tourDiv.classList.add("tour");

  // Tạo thẻ img cho hình ảnh tour
  const img = document.createElement("img");
  img.src = tour.img;
  img.alt = tour.name;

  // Tạo thẻ h3 cho tên tour
  const name = document.createElement("h3");
  name.textContent = tour.name;

  // Tạo thẻ p cho giá tour
  const price = document.createElement("p");
  price.textContent = `Giá: ${tour.price}`;

  // Thêm các thành phần vào div tour
  tourDiv.appendChild(img);
  tourDiv.appendChild(name);
  tourDiv.appendChild(price);

  // Thêm nút đăng ký tour
  const registerBtn = document.createElement("button");
  registerBtn.textContent = "Đăng ký";
  registerBtn.classList.add("register-btn");
  registerBtn.onclick = () => {
    window.location.href = `http://127.0.0.1:5500/front-end/tour_payment.html?tour_id=${tour._id}`;
  };

  // Them nut luu tour
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Lưu tour";
  saveBtn.classList.add("save-btn");
  saveBtn.onclick = () => {
    saveTour(tour._id);
  };

  tourDiv.appendChild(registerBtn);
  tourDiv.appendChild(saveBtn);

  return tourDiv;
}

// show all tours
function showAllTours() {
  fetch("http://127.0.0.1:3000/tours")
    .then((response) => response.json())
    .then((tours) => {
      const tourList = document.getElementById("tourList");
      tourList.innerHTML = ""; // Xóa danh sách tour hiện tại

      // Hiển thị tất cả các tour
      tours.forEach((tour) => {
        const tourDiv = createTour(tour);
        tourList.appendChild(tourDiv);
      });
    })
    .catch((error) => console.error("Error fetching tours:", error));
}

// loc tour
document.getElementById('filterBtn').addEventListener('click', function(e) {
  e.preventDefault();

  const minPrice = document.getElementById("min_price").value;
  const maxPrice = document.getElementById("max_price").value;
  const category = document.getElementById("category").value;

 
  showFilteredTours(minPrice, maxPrice, category);
  window.location.hash = `#min_price=${minPrice}&max_price=${maxPrice}&category=${category}`;
})

// show filtered tours
function showFilteredTours(
  minPrice = 0,
  maxPrice = Infinity,
  category = "all"
) {
  fetch(
    `http://127.0.0.1:3000/tours/filter_tours?min_price=${minPrice}&max_price=${maxPrice}&category=${category}`
  )
    .then((response) => response.json())
    .then((tours) => {
      const tourList = document.getElementById("tourList");
      tourList.innerHTML = "";

      tours.forEach((tour) => {
        const tourDiv = createTour(tour);
        tourList.appendChild(tourDiv);
      });
    })
    .catch((error) => console.error("Error fetching tours:", error));
}

// call showAllTours to display tour when load page
document.addEventListener("DOMContentLoaded", function () {
  showAllTours();
});

// Ham luu tour
function saveTour(tourId) {

  if (!localStorage.getItem('user_id')) {
    alert('You are not login. Please login and try again');
    return;
  }

  localStorage.setItem('saved_tour_id', tourId)
  
  data = {
    user_id: localStorage.getItem('user_id'),
    tour_id: tourId
  }

  fetch(`http://127.0.0.1:3000/tours/save_tour`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: 'include',
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Tour is saved successfully");
      } else {
        alert(data.message);
        localStorage.removeItem('saved_tour_id');
      }
    })
    .catch((error) => console.error("Loi khi luu tour:", error));
}
