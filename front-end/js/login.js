function login()  {
    //e.preventDefault(); // Ngăn chặn hành vi mặc định của nút

    const credentials = {
        username: document.querySelector('input[name="username"]').value,
        password: document.querySelector('input[name="password"]').value
    };

    fetch('http://127.0.0.1:3001/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // console.log(data); 
        if (data.message === "Login successful") {
            alert(data.message); // Hiển thị thông báo cho người dùng
            // luu username vao localStorage
            localStorage.setItem('username', data.username);
            localStorage.setItem('user_id', data.user_id);
            window.location.href = 'http://127.0.0.1:5500/front-end/info.html';
        } else {
            alert('Invalid username or password');
        }
    })
    .catch(error => console.error("Error:", error));
}
