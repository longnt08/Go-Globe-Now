fetch('/user') // đường dẫn API của bạn
    .then(response => response.json()) // chuyển đổi phản hồi thành JSON
    .then(data => {
        // Sử dụng dữ liệu JSON trong JavaScript
        console.log(data); // Kiểm tra dữ liệu lấy được trong console
        const username = data.username; // Lấy thông tin từ JSON, ví dụ là "username"
        const email = data.email; // Lấy email, nếu JSON có trường email
        // Hiển thị dữ liệu hoặc sử dụng trong HTML
        document.getElementById("username").textContent = username;
        document.getElementById("email").textContent = email;
    })
    .catch(error => console.error('Error:', error));
