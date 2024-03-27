document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        document.getElementById("message").textContent = "Mật khẩu không hợp lệ";
    } else {
        var users = JSON.parse(localStorage.getItem("users")) || [];
        var existingUser = users.find(function(u) {
            return u.username === username;
        });

        if (existingUser) {
            document.getElementById("message").textContent = "Tên tài khoản đã tồn tại";
        } else {
            var newUser = {
                username: username,
                email: email,
                password: password,
                status: "Được phép truy cập",
                action: "0",
            };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            document.getElementById("message").textContent = "Đăng kí thành công";
            window.location.href = "index.html";
        }
    }
});
document.getElementById("login").addEventListener("click", function() {
    window.location.href = "./login.html";
});
