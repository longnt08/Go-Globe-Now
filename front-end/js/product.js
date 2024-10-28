// script.js

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

// create tour
function createTour(tour) {
    // Tạo div cho từng sản phẩm
    const tourDiv = document.createElement("div");
    tourDiv.classList.add("tour");

    // Tạo thẻ img cho hình ảnh sản phẩm
    const img = document.createElement("img");
    img.src = tour.image;
    img.alt = tour.name;

    // Tạo thẻ h3 cho tên sản phẩm
    const name = document.createElement("h3");
    name.textContent = tour.name;

    // Tạo thẻ p cho giá sản phẩm
    const price = document.createElement("p");
    price.textContent = `Giá: ${tour.price}`;

    // Thêm các thành phần vào div sản phẩm
    tourDiv.appendChild(img);
    tourDiv.appendChild(name);
    tourDiv.appendChild(price);

    return tourDiv;
}

function renderTours(tours) {
    const tourList = document.getElementById("tourList");
    tours.forEach(tour => {
        const tourDiv = createTour(tour);
        tourList.appendChild(tourDiv);
    });
}

// show all tours
function showAllTours() {
    fetch('http://127.0.0.1:5000/api/tours')
    .then(response => response.json())
    .then(tours => {
        const tourList = document.getElementById('tourList');
        tourList.innerHTML = "";

        tours.forEach(tour => {
            const tourDiv = document.createElement('div');
            tourDiv.classList.add("tour");

            // add tour name
            const name = document.createElement("h3");
            name.textContent = tour.name;
            tourDiv.appendChild(name);

            // add tour price
            const price = document.createElement("p");
            price.textContent = `Price: ${tour.price} VND`;
            tourDiv.appendChild(price);

            // add tour image
            const image = document.createElement("img");
            image.src = tour.image;
            image.alt = tour.name;
            tourDiv.appendChild(image);

            // add tour to tourList
            tourList.appendChild(tourDiv);
        });
    })
    .catch(error => console.error("Error fetching tours:", error));
}

// filter tour
function applyFilter() {
    const minPrice = document.getElementById('min_price').value;
    const maxPrice = document.getElementById('max_price').value;
    const category = document.getElementById('category').value;

    fetch(`http://127.0.0.1:5000/api/tours?min_price=${minPrice}&max_price=${maxPrice}&category=${category}`)
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        renderTours(data);
    })
    .catch(error => console.error("Error fetching tours: ", error));
}

// call showAllTours to display tour when load page
document.addEventListener("DOMContentLoaded", showAllTours);