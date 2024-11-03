let All = document.querySelector(".All");
let Menu = Array.from(All.children);
let payment = document.querySelector(".payment");
let tagNode12 = document.querySelector(".tagNode12");
let tagNode21 = document.querySelector(".tagNode21");
let tagNode23 = document.querySelector(".tagNode23");
let tagNode32 = document.querySelector(".tagNode32");
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
  All.setAttribute("style", `left: -2000px`);
};
tagNode21.onclick = function () {
  All.setAttribute("style", `left: 0px`);
};
tagNode23.onclick = function () {
  All.setAttribute("style", `left: -4000px`);
};
tagNode32.onclick = function () {
  All.setAttribute("style", `left: -2000px`);
};
