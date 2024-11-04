document.addEventListener("DOMContentLoaded", function() {
    // Lấy các phần tử cần thiết
    const passwordInput = document.querySelector('input[name="password"]');
    const togglePassword = document.createElement('span');

    // Thêm biểu tượng hiển thị mật khẩu
    togglePassword.textContent = '👁️';
    togglePassword.style.cursor = 'pointer';
    passwordInput.parentNode.insertBefore(togglePassword, passwordInput.nextSibling);

    // Xử lý sự kiện nhấn nút hiển thị mật khẩu
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️'; // Thay đổi biểu tượng
    });

    // Xử lý sự kiện nhấn nút Đăng nhập
    const loginButton = document.querySelector('.login-button');
    loginButton.addEventListener('click', function(event) {
        const username = document.querySelector('input[name="username"]').value;
        const password = passwordInput.value;

        if (!username || !password) {
            event.preventDefault(); // Ngăn chặn gửi form
            alert('Vui lòng nhập tên đăng nhập và mật khẩu.'); // Hiện thông báo lỗi
        } else {
            // Thêm hiệu ứng chuyển động (như một ví dụ đơn giản)
            loginButton.style.transition = 'background-color 0.3s ease';
            loginButton.style.backgroundColor = '#FF5733'; // Thay đổi màu nút khi nhấn
            setTimeout(() => {
                loginButton.style.backgroundColor = '#38B2AC'; // Khôi phục màu sau 0.3 giây
            }, 300);
        }
    });
});
