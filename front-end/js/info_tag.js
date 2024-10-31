let tag = document.getElementsByClassName("myOption");
console.log(tag);
for (let i = 0; i < tag.length; i++) {
  tag[i].onclick = function (e) {
    changTag(i);
  };
}
function changTag(i) {
  switch (i) {
    case 2:
      window.location.href = "./info.html";
      break;
    case 3:
      window.location.href = "./info2.html";
      break;
    case 4:
      window.location.href = "./info3.html";
      break;
    case 5:
      window.location.href = "./info4.html";
      break;
    case 6:
      window.location.href = "./info5.html";
      break;
    // case 7:
    //   window.location.href = "./LogIn.html";
    //   break;
    default:
      console.log("Loi!!");
  }
}
