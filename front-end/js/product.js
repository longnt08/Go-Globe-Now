// script.js

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
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

// call showAllTours to display tour when load page
document.addEventListener("DOMContentLoaded", showAllTours);