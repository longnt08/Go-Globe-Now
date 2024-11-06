document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.login-button').addEventListener('click', function (e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của nút

        const credentials = {
            username: document.querySelector('input[name="username"]').value,
            password: document.querySelector('input[name="password"]').value
        };

        console.log("User Credentials:", credentials);

        fetch('http://127.0.0.1:5000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Kiểm tra phản hồi từ server
            if (data.message === "Login successful") {
                alert(data.message); // Hiển thị thông báo cho người dùng
                if (data.user_id) {
                    // luu username vao localStorage
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('user_id', data.user_id);
                    console.log("Redirecting to info page...");
                    window.location.assign = 'http://127.0.0.1:5500/front-end/info.html';
                }
            }
        })
        .catch(error => {
            if (error.message.includes('401')) {
                console.error('Unauthorized access - Check credentials or CORS settings');
                alert('Failed to login');
            } else {
                console.error('Error:', error);
                alert('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại!');
            }
        });
    });
});
