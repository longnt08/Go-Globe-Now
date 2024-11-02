document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    const registerButton = document.querySelector('.signup-button'); // Sử dụng class để tìm nút đăng ký

    // Hiệu ứng focus cho input
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = '#38B2AC'; // Màu viền khi focus
        });

        input.addEventListener('blur', function () {
            this.style.borderColor = '#CBD5E1'; // Trả về màu viền ban đầu
        });
    });

    // Thông báo khi nhấn nút đăng ký
    registerButton.addEventListener('click', function (event) {
        event.preventDefault(); // Ngăn chặn form gửi đi
        alert('Đăng ký thành công!'); // Hiển thị thông báo thành công
    });
});
