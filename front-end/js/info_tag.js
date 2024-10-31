let tag = document.getElementsByClassName("myOption");
let ChiMuc = 2;
All.setAttribute(
  "style",
  `top: 0px; left: ${-ChiMuc * (window.innerWidth - 460)}px;`
);
for (let i = 0; i < tag.length; i++) {
  tag[i].onclick = function (e) {
    tag[ChiMuc].removeAttribute("style");
    tag[i].setAttribute("style", `background-color: rgba(0, 60, 255, 0.5);`);
    ChiMuc = i;
    All.setAttribute(
      "style",
      `top: 0px; left: ${-i * (window.innerWidth - 460)}px;`
    );
  };
}
let back = document.getElementById("back");
back.onclick = function () {
  window.location.href = "#";
};
tag[7].onclick = function () {
  window.location.href = "#";
};
