
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
    const tourId = params.get("tour_id");

    if(tourId) {
        fetch(`http://127.0.0.1:3000/tours/${tourId}`)
        .then(response => response.json())
        .then(tour => {
            document.getElementById("tourName").textContent = tour.name;
            document.getElementById("tourImage").src = tour.img;
            document.getElementById("destinations").textContent = tour.destinations;
            document.getElementById("maxPeople").textContent = tour.max_people;
            document.getElementById("price").textContent = tour.price;

            dates = tour.start_date;
            startDay = document.getElementById("startDay");
            dates.forEach(date => {
              const option = document.createElement("option");
              option.value = date;
              option.textContent = date;
              startDay.appendChild(option);
            })
        })
        .catch(error => console.error("Error fetching tour details: ", error));
    }

    if (!localStorage.getItem('user_id')) {
      alert('You are not login. Please login and try again');
      // return;
    }
})

    // handle form when user click register
  function register_tour() {
    const params = new URLSearchParams(window.location.search);
    const tour_id = params.get("tour_id");
    const user_id = localStorage.getItem('user_id')
      // get data from form
      const registrationData = {
        name: document.getElementById("firstName").value + " " + document.getElementById("lastName").value,
        gender: document.getElementById("gender").value,
        birthday: document.getElementById("birthday").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        cccd: document.getElementById("cccd").value,
        address: document.getElementById("address").value,
        numPeople: document.getElementById("numPeople").value,
        startDay: document.getElementById("startDay").value,
        tour_id: tour_id, 
        user_id: user_id
    };
    // send POST command to register
    fetch("http://127.0.0.1:3000/tours/register_tour", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        registrationData: 'include',
        body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
          alert(data.success);
          window.location.href = "http://127.0.0.1:5500/front-end/tours.html";
        } else {
          alert(data.message);
        }
    })
    .catch(error => console.error("Error registering tour:", error));
  }

let All = document.querySelector(".All");
let Menu = Array.from(All.children);
let payment = document.querySelector(".payment");
let tagNode12 = document.querySelector(".tagNode12");
let tagNode21 = document.querySelector(".tagNode21");
let tagNode23 = document.querySelector(".tagNode23");
let tagNode32 = document.querySelector(".tagNode32");
let myInfo = document.querySelector(".myInfo");
let card = document.querySelector(".card");
let myTable = document.querySelector(".myTable");
let myBill = document.querySelector(".myBill");
let myStage2 = document.querySelector(".myStage2");
let myStage3 = document.querySelector(".myStage3");
let tag1 = document.querySelector(".tag1");
let tag2 = document.querySelector(".tag2");
let tag3 = document.querySelector(".tag3");
Menu.push(payment);
for (let i = 0; i < Menu.length; i++) {
  Menu[i].setAttribute(
    "style",
    `width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
  );
}
All.setAttribute("style", `height: ${window.innerHeight}px`);
window.addEventListener("resize", function () {
  for (let i = 0; i < Menu.length; i++) {
    Menu[i].setAttribute(
      "style",
      `width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
    );
  }
  All.setAttribute("style", `height: ${window.innerHeight}px`);
});
tagNode12.onclick = function () {
  myTable.classList.toggle("toPayment2");
  myBill.classList.toggle("toPayment2");
  myStage2.classList.toggle("toPayment2");
  tag1.classList.toggle("toPayment2");
  tag2.classList.toggle("toPayment2");
};
tagNode21.onclick = function () {
  myTable.classList.toggle("toPayment2");
  myBill.classList.toggle("toPayment2");
  myStage2.classList.toggle("toPayment2");
  tag1.classList.toggle("toPayment2");
  tag2.classList.toggle("toPayment2");
};
tagNode23.onclick = function () {
  myInfo.classList.toggle("opacity");
  setTimeout(() => {
    myInfo.classList.toggle("None");
    card.classList.toggle("None");
    setTimeout(() => {
      card.classList.toggle("opacity");
    }, 200);
  }, 500);
  myStage3.classList.toggle("toPayment3");
  tag2.classList.toggle("toPayment2");
  tag3.classList.toggle("toPayment3");
};
tagNode32.onclick = function () {
  card.classList.toggle("opacity");
  setTimeout(() => {
    card.classList.toggle("None");
    myInfo.classList.toggle("None");
    setTimeout(() => {
      myInfo.classList.toggle("opacity");
    }, 200);
  }, 500);
  myStage3.classList.toggle("toPayment3");
  tag2.classList.toggle("toPayment2");
  tag3.classList.toggle("toPayment3");
};