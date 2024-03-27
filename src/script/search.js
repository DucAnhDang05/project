let linkLogin = document.getElementById("link-login");
let linkRegiter = document.getElementById("link-register");
let linkSignOut = document.getElementById("link-signout");

// Lấy thông tin của user đăng nhập từ localStorage
const userLogin = JSON.parse(localStorage.getItem("userLogin"));

// Kiểm tra xem người dùng đã đăng nhập chưa và dữ liệu userLogin có hợp lệ hay không
if (userLogin && userLogin.username) {
    const username = userLogin.username;
    linkLogin.style.display = "none";
    linkRegiter.style.display = "none";
    linkSignOut.style.display = "block";

    // Tạo phần tử span để chứa tên đăng nhập
    const usernameSpan = document.createElement("span");
    usernameSpan.textContent = username;
    usernameSpan.classList.add("username-label");

    // Chèn phần tử span vào trước nút đăng xuất
    const signOutLink = document.getElementById("link-signout");
    signOutLink.parentNode.insertBefore(usernameSpan, signOutLink);
} else {
    linkLogin.style.display = "block";
    linkRegiter.style.display = "block";
    linkSignOut.style.display = "none"; // Ẩn nút "Đăng xuất"
}
// Lắng nghe sự kiện click của nút tìm kiếm
document.getElementById("searchButton").addEventListener("click", function(event) {
    event.preventDefault(); 
    searchProduct(); 
});

// Hàm thực hiện tìm kiếm sản phẩm
function searchProduct() {
    let searchName = document.getElementById("searchInput").value;
    let productList = JSON.parse(localStorage.getItem("productList")); // Lấy dữ liệu sản phẩm từ localStorage
    let productSearch = productList.filter(value => value.name.toUpperCase().includes(searchName.toUpperCase()));
    localStorage.setItem("productSearch", JSON.stringify(productSearch)); // Lưu kết quả tìm kiếm vào localStorage
    window.location.href = "./search-product.html"; // Chuyển hướng sang trang tìm kiếm
}

// Lấy kết quả tìm kiếm từ localStorage và hiển thị lên trang
window.addEventListener("DOMContentLoaded", function() {
    let search = JSON.parse(localStorage.getItem("productSearch")); // Lấy kết quả tìm kiếm từ localStorage
    let productContainer = document.getElementById("product-container");

    if (search) { // Kiểm tra xem có kết quả tìm kiếm không
        displaySearchResults(search); // Nếu có, hiển thị kết quả tìm kiếm
    } else {
        productContainer.innerHTML = "<p>Không tìm thấy kết quả.</p>"; // Nếu không có, hiển thị thông báo không tìm thấy
    }
});

// Hàm hiển thị kết quả tìm kiếm
function displaySearchResults(searchProduct) {
    let productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ''; // Xóa nội dung cũ trước khi render kết quả mới
    //Ham forEach lap tung phan tu
    searchProduct.forEach(product => {
        productContainer.innerHTML += 
        `
            <div class="card" style="width: 17.5rem;margin-bottom: 20px;">
                <img src="${product.images[0]}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    <p class="card-text">Rating: ${product.rating}</p>
                    <p class="card-text">Lượt bán: ${product.sold}</p>
                    <p class="card-text">${product.description}</p>
                    <a href="./product-detail.html?id=${product.id}" class="btn btn-primary">Xem sản phẩm</a>
                </div>
            </div>
        `;
    });
}
