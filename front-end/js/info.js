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
