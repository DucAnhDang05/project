document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var users = JSON.parse(localStorage.getItem("users")) || [];
    var user = users.find(function(u) {
        return u.username === username && u.password === password;
    });

    if (user) {
        if (user.status === "Đang bị chặn") {
            alert("Tài khoản của bạn đã bị chặn");
        } else {
            document.getElementById("message").textContent = "Đăng nhập thành công";
            localStorage.setItem("userLogin", JSON.stringify(user))
            window.location.href = "index.html";
        }
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu");
    }
});

document.getElementById("signUp").addEventListener("click", function() {
    window.location.href = "./signup.html";
});
