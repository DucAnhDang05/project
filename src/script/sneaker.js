let productList = JSON.parse(localStorage.getItem("productList"))
let sneakersList = productList.filter(function(e,i){
  return e.type === 1;
});
let sportsList = productList.filter(function(e,i){
  return e.type === 2;
});

let typeList = JSON.parse(localStorage.getItem("typeList"));
let sneakerBanner = document.getElementById("sneaker-banner");
let sneakerTitle = document.getElementById("sneaker-title");
sneakerBanner.src = sneakerBanner.image;
sneakerTitle.innerHTML = typeList[1].type;
let sneakerProductContainer = document.getElementById("sneaker-product-container")

for (let index in sneakersList ){
  sneakerProductContainer.innerHTML += `
  <div class="card" style="width: 17.5rem;margin-bottom: 20px;">
      <img src="${sneakersList[index].images[0]}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${sneakersList[index].name}</h5>
        <p class="card-text">${sneakersList[index].price}</p>
        <p class="card-text">Rating: ${sneakersList[index].rating}</p>
        <p class="card-text">Lượt bán: ${sneakersList[index].sold}</p>
        <p class="card-text">${sneakersList[index].description}</p>
        <a href="./product-detail.html?id=${sneakersList[index].id}" class="btn btn-primary">Xem sản phẩm</a>
      </div>
    </div>
  `;
}

let linkLogin = document.getElementById("link-login")
let linkRegiter = document.getElementById("link-register")
let linkSignOut = document.getElementById("link-signout")

const userLogin = JSON.parse(localStorage.getItem("userLogin"));
// Đăng nhập
if (userLogin) {
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
  linkSignOut.style.display = "none";
}

//Chuyển hướng sang searchPage
function searchProduct(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    window.location.href = `./search-product.html?query=${searchInput}`; // Điều hướng đến trang search-product.html với tham số tìm kiếm
}

//Hien thi gio hang
document.addEventListener("DOMContentLoaded", function() {
    let cartButton = document.getElementById("link-cart");
    let cartContainer = document.getElementById("cart-container");
    let hideTimer; // Biến để lưu trữ ID của setTimeout

    cartButton.addEventListener("mouseover", showCart);
    cartButton.addEventListener("mouseout", startHideTimer); // Bắt đầu đếm ngược khi rời khỏi nút giỏ hàng

    function showCart() {
        clearTimeout(hideTimer); // Xóa bất kỳ đếm ngược nào khi di chuột vào nút giỏ hàng
        let cartItems = JSON.parse(localStorage.getItem("cart"));
        let cartTable = document.getElementById("cart-table");
        cartTable.innerHTML = "";

        if (cartItems && cartItems.length > 0) {
            cartItems.forEach(function(product) {
                let cardDiv = document.createElement("div");
                cardDiv.classList.add("card");

                let img = document.createElement("img");
                img.classList.add("card-img-top");
                img.src = product.images[0];

                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                cardBody.innerHTML = `
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    <p class="card-text">Rating: ${product.rating}</p>
                    <p class="card-text des">${product.description}</p>
                    <a href="./product-detail.html?id=${product.id}" class="btn btn-primary">Xem sản phẩm</a>
                    <a href="./index.html" id="add-to-cart" class="btn btn-primary" style="margin-top:10px">Add to cart</a>
                  `;

                cardDiv.appendChild(img);
                cardDiv.appendChild(cardBody);
                cartTable.appendChild(cardDiv);
            });
        } else {
            cartTable.innerHTML = "<p>Giỏ hàng đang trống</p>";
        }

        cartContainer.style.display = "block";
    }

    function startHideTimer(){
        // Bắt đầu đếm ngược và sau 5 giây ẩn phần sản phẩm trong giỏ hàng
        hideTimer = setTimeout(function() {
            cartContainer.style.display = "none";
        }, 5000);
    }
});


// Lấy thông tin về nút "Thêm vào giỏ hàng"
let addToCartButton = document.getElementById("add-to-cart");

// Gán sự kiện click cho nút "Thêm vào giỏ hàng"
addToCartButton.addEventListener("click", function() {
    // Lấy thông tin sản phẩm từ localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Thêm sản phẩm hiện tại vào giỏ hàng
    cart.push(product);

    // Lưu danh sách giỏ hàng mới vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Thông báo cho người dùng đã thêm sản phẩm vào giỏ hàng thành công
    alert("Sản phẩm đã được thêm vào giỏ hàng!");

    // Cập nhật số lượng sản phẩm trong giỏ hàng trên giao diện
    updateCartCount(cart.length);
});
