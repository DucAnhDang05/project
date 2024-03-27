let linkLogin = document.getElementById("link-login")
let linkRegiter = document.getElementById("link-register")
let linkSignOut = document.getElementById("link-signout")

// Lấy thông tin của user đăng nhập
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

let id = window.location.href.split("?")[1].split("=")[1]
let productList = JSON.parse(localStorage.getItem("productList"));
let product = productList.find(function(e,i){
    return e.id === +id;
}); 

//Thông tin
let titleContainer = document.getElementById("product-title");
let brandContainer = document.getElementById("product-brand")
let ratingContainer = document.getElementById("product-rating");
let descriptionContainer = document.getElementById("product-description");
let priceContainer = document.getElementById("product-price");
let sizeContainer = document.getElementById("product-size")
let soldContainer = document.getElementById("product-sold");

soldContainer.innerHTML = "Lượt bán: "+product.sold;
sizeContainer.innerHTML ="Size: " + product.size
brandContainer.innerHTML ="Brand: " + product.brand;
titleContainer.innerHTML = product.name;
ratingContainer.innerHTML = product.rating;
descriptionContainer.innerHTML = product.description;
priceContainer.innerHTML = product.price + "đ";


// Thêm ảnh
let images = product.images;
var carouselIndicators = $("#carousel-indicators");
var carouselInner = $("#carousel-inner");
images.forEach(function (image, index) {
    var indicator = $("<li></li>").attr("data-target", "#myCarousel").attr("data-slide-to", index);
    if (index === 0) {
        indicator.addClass("active");
    }
    carouselIndicators.append(indicator);

    var item = $("<div></div>").addClass("carousel-item");
    if (index === 0) {
        item.addClass("active");
    }
     var img = $("<img>").attr("src", image).attr("alt", "Image " + (index + 1)).css({
        "width": "100%",
        "height": "auto",
        "align-item" : "center" // Tự động điều chỉnh chiều cao để fit với chiều rộng và không làm méo ảnh
    });
    item.append(img);
    carouselInner.append(item);
});

// sản phẩm tham khảo
let randomProducts = [];
let numProductsToGenerate = 4;

// Tạo mảng chứa 4 thông tin sản phẩm ngẫu nhiên
while (randomProducts.length < numProductsToGenerate) {
  let randomIndex = Math.floor(Math.random() * productList.length);
  let randomProduct = productList[randomIndex];
  if (!randomProducts.includes(randomProduct)) {
    randomProducts.push(randomProduct);
  }
}

// Hiển thị thông tin sản phẩm ngẫu nhiên
let productContainer = document.getElementById("product-container");
for (let product of randomProducts) {
  productContainer.innerHTML += `
    <div class="card" style="width: 17.5rem;margin-bottom: 20px;margin-left:35px">
      <img src="${product.images[0]}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.price}</p>
        <p class="card-text">Rating: ${product.rating}</p>
        <p class="card-text">${product.description}</p>
        <a href="./product-detail.html?id=${product.id}" class="btn btn-primary">Xem sản phẩm</a>
        <a href="#" class="btn btn-primary add-to-cart-btn" style="margin-top:10px">Add to cart</a>
      </div>
    </div>
  `;
}

//Chuyển hướng sang searchPage
function searchProduct(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    window.location.href = `./search-product.html?query=${searchInput}`; // Điều hướng đến trang search-product.html với tham số tìm kiếm
}


// Lấy thông tin về nút "Thêm vào giỏ hàng"
let addToCartButton = document.getElementById("add-to-cart");

// Gán sự kiện click cho nút "Thêm vào giỏ hàng"
addToCartButton.addEventListener("click", function() {
    // Lấy thông tin sản phẩm từ localStorage
    if (!userLogin) {
      // Nếu chưa đăng nhập, không thực hiện thêm sản phẩm vào giỏ hàng
      alert("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
      return;
    }
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

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng trên giao diện
function updateCartCount(count) {
    // Lấy phần tử hiển thị số lượng sản phẩm trong giỏ hàng
    let cartCountElement = document.getElementById("cart-count");

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    cartCountElement.textContent = count;
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
                    <p class="card-text">${product.description}</p>
                    <a href="./product-detail.html?id=${product.id}" class="btn btn-primary">Xem sản phẩm</a>
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

