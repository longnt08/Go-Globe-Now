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
