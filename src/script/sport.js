let typeList = JSON.parse(localStorage.getItem("typeList"));
let sportBanner = document.getElementById("sport-banner");
let sportTitle = document.getElementById("sport-title");
sportBanner.src = sportBanner.image;
sportTitle.innerHTML = typeList[0].type;

let productList = JSON.parse(localStorage.getItem("productList"))
let sneakersList = productList.filter(function(e,i){
  return e.type === 1;
});
let sportsList = productList.filter(function(e,i){
  return e.type === 2;
});

let sportProductContainer = document.getElementById("sport-product-container")
for (let index in sportsList ){
  sportProductContainer.innerHTML += `
  <div class="card" style="width: 18rem;margin-bottom: 20px;">
      <img src="${sportsList[index].images[0]}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${sportsList[index].name}</h5>
        <p class="card-text">${sportsList[index].price}</p>
        <p class="card-text">Rating: ${sportsList[index].rating}</p>
        <p class="card-text">Lượt bán: ${sportsList[index].sold}</p>
        <p class="card-text">${sportsList[index].description}</p>
        <a href="./product-detail.html?id=${sportsList[index].id}" class="btn btn-primary">Xem sản phẩm</a>
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

document.addEventListener("DOMContentLoaded", function() {
    // Lắng nghe sự kiện click trên tất cả các nút "Add to cart"
    let addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            // Ngăn chặn hành vi mặc định của nút (chẳng hạn chuyển hướng đến một trang khác)
            event.preventDefault();

            // Lấy thông tin của user đăng nhập từ Local Storage
            const userLogin = JSON.parse(localStorage.getItem("userLogin"));

            // Kiểm tra xem user đã đăng nhập hay chưa
            if (!userLogin) {
                // Nếu chưa đăng nhập, không thực hiện thêm sản phẩm vào giỏ hàng
                alert("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
                return;
            }

            // Lấy thông tin sản phẩm từ phần tử của nút được nhấn
            let productCard = button.closest(".card");
            let productNameElement = productCard.querySelector(".card-title");
            let productName = productNameElement.textContent.trim(); // Lấy tên sản phẩm và loại bỏ khoảng trắng đầu cuối

            // Tìm thông tin sản phẩm có tên giống với tên sản phẩm trong productList
            let productInfo = productList.find(function(product) {
                return product.name.trim() === productName;
            });

            // Tạo đối tượng sản phẩm từ thông tin lấy được
            let product = productInfo;

            // Lấy giỏ hàng từ Local Storage hoặc tạo mới nếu chưa tồn tại
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Thêm sản phẩm vào giỏ hàng
            cart.push(product);

            // Lưu giỏ hàng mới vào Local Storage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Hiển thị thông báo cho người dùng
            alert("Sản phẩm đã được thêm vào giỏ hàng!");

            // Cập nhật số lượng sản phẩm trong giỏ hàng trên giao diện
            updateCartCount();
        });
    });
});