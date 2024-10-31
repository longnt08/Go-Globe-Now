let accounts = document.querySelector(".accounts");
let option = document.querySelector(".option");
let action = document.querySelector(".action");
accounts.setAttribute(
  "style",
  `width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
);
option.setAttribute("style", `height: ${window.innerHeight - 150}px`);
action.setAttribute(
  "style",
  `width: ${window.innerWidth - 460}px; height: ${window.innerHeight - 150}px`
);
window.addEventListener("resize", function () {
  accounts.setAttribute(
    "style",
    `width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
  );
  option.setAttribute("style", `height: ${window.innerHeight - 150}px`);
  action.setAttribute(
    "style",
    `width: ${window.innerWidth - 460}px; height: ${window.innerHeight - 150}px`
  );
});
