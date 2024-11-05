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
            if (data.message) {
                alert(data.message); // Hiển thị thông báo cho người dùng
                if (data.user_id) {
                    // Thực hiện kiểm tra profile sau khi đăng nhập thành công
                    fetch('http://127.0.0.1:5000/users/profile', {
                        method: 'GET',
                        credentials: 'include',
                    })
                    .then(response => response.json())
                    .then(profileData => {
                        console.log('Profile check:', profileData);
                        if (profileData.message === "User is logged in") {
                            console.log("Session is active and user is logged in.");
                            // Sau khi xác nhận session, điều hướng sang trang chủ hoặc trang khác
                            // window.location.href = "http://127.0.0.1:3000/#";
                        } else {
                            console.log("User is not logged in.");
                            alert("Có lỗi xảy ra. Vui lòng đăng nhập lại.");
                        }
                    })
                    .catch(error => console.error('Error fetching profile:', error));
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại!');
        });
    });
});
