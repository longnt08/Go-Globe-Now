var postApi = "http://127.0.0.1:5000/users";
fetch(postApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (posts) {
    console.log(posts);
    document.getElementById("firstName").value = posts.first_name
      ? posts.first_name
      : "";
    document.getElementById("lastName").value = posts.last_name
      ? posts.last_name
      : "";
    if (posts.gender) {
      document.querySelector(
        `input[name="Sex"][value="${posts.gender}"]`
      ).checked = true;
    }
    document.getElementById("birthday").value = posts.dob ? posts.dob : "";
    document.getElementById("phone").value = posts.phone ? posts.phone : "";
    document.getElementById("email").value = posts.email ? posts.email : "";
    document.getElementById("address").value = posts.address
      ? posts.address
      : "";
  });
