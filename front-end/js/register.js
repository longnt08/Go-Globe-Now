document.querySelector('.signup-button').addEventListener('click', function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút

    let dob = document.querySelector('input[name="dob"]').value;
    if (dob) {
        const [year, month, day] = dob.split("-");
        dob = `${day}-${month}-${year}`;
    }

    const userData = {
        first_name: document.querySelector('input[name="first_name"]').value,
        last_name: document.querySelector('input[name="last_name"]').value,
        dob: dob,
        gender: document.querySelector('select[name="gender"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        address: document.querySelector('input[name="address"]').value,
        username: document.querySelector('input[name="username"]').value,
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value
    };

    console.log("User Data:", userData);

    fetch('http://127.0.0.1:5000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Kiểm tra phản hồi từ server
        if (data.message) {
            alert(data.message); // Hiển thị thông báo cho người dùng
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
