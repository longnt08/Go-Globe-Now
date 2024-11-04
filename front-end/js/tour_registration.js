document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const tourId = params.get("tour_id");

    if(tourId) {
        fetch(`http://127.0.0.1:5000/tours/${tourId}`)
        .then(response => response.json())
        .then(tour => {
            document.getElementById("tourName").textContent = tour.name;
            document.getElementById("tourImage").src = tour.img;
            document.getElementById("destination").textContent = tour.destination;
            document.getElementById("startDate").textContent = tour.start_date;
            document.getElementById("endDate").textContent = tour.end_date;
            document.getElementById("maxPeople").textContent = tour.max_people;
            document.getElementById("price").textContent = tour.price;
        })
        .catch(error => console.error("Error fetching tour details: ", error));
    }

    // handle form when user click register
    document.getElementById("registrationForm").addEventListener("submit", event => {
        event.preventDefault();

        // get data from form
        const registrationData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            cccd: document.getElementById("cccd").value,
            email: document.getElementById("email").value,
            paymentMethod: document.getElementById("paymentMethod").value,
            numPeople: document.getElementById("numPeople").value,
            tour_id: tourId // Gửi kèm tour_id để xác định tour
        };
        // send POST command to register
        fetch("http://127.0.0.1:5000/tours/register_tour", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(registrationData)
        })
        .then(response => response.json())
        .then(data => {
            alert("Registration successful");
            window.location.href = "../tours.html";
        })
        .catch(error => console.error("Error registering tour:", error));
    });
});