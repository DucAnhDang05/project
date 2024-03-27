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

// Render
let productList = JSON.parse(localStorage.getItem("productList"))
let sneakersList = productList.filter(function(e,i){
  return e.type === 1;
});
let sportsList = productList.filter(function(e,i){
  return e.type === 2;
});

let typeList = JSON.parse(localStorage.getItem("typeList"));
//Tiêu đề và ảnh banner
let sportBanner = document.getElementById("sport-banner");
let sportTitle = document.getElementById("sport-title");
sportBanner.src = sportBanner.image;
sportTitle.innerHTML = typeList[0].type; 

//Tiêu đề và ảnh banner
let sneakerBanner = document.getElementById("sneaker-banner");
let sneakerTitle = document.getElementById("sneaker-title");
sneakerBanner.src = sneakerBanner.image;
sneakerTitle.innerHTML = typeList[1].type;

//Giay the thao
let sportProductContainer = document.getElementById("product-container")
for (let index = 0;index<4;index++ ){
  sportProductContainer.innerHTML += `
  <div class="card" style="width: 18rem;">
      <img src="${sportsList[index].images[0]}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${sportsList[index].name}</h5>
        <p class="card-text">${sportsList[index].price}</p>
        <p class="card-text rating">Rating: ${sportsList[index].rating}</p>
        <p class="card-text sold">Lượt bán: ${sportsList[index].sold}</p>
        <p class="card-text des">${sportsList[index].description}</p>
        <a href="./product-detail.html?id=${sportsList[index].id}" class="btn btn-primary">Xem sản phẩm</a>
        <a href="#" class="btn btn-primary add-to-cart-btn" style="margin-top:10px">Add to cart</a>
      </div>
    </div>
  `;
}
//Sneaker
let sneakerProductContainer = document.getElementById("sneaker-product-container")
for (let index = 0;index<4;index++ ){
  sneakerProductContainer.innerHTML += `
  <div class="card" style="width: 17.5rem;margin-bottom:50px">
      <img src="${sneakersList[index].images[0]}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${sneakersList[index].name}</h5>
        <p class="card-text">${sneakersList[index].price}</p>
        <p class="card-text rating">Rating: ${sneakersList[index].rating}</p>
        <p class="card-text sold">Lượt bán: ${sneakersList[index].sold}</p>
        <p class="card-text des">${sneakersList[index].description}</p>
        <a href="./product-detail.html?id=${sneakersList[index].id}" class="btn btn-primary">Xem sản phẩm</a>
        <a href="#" class="btn btn-primary add-to-cart-btn" style="margin-top:10px">Add to cart</a>
      </div>
    </div>
  `;
}

// Sắp xếp productList theo số lượt bán giảm dần
productList.sort((a, b) => b.sold - a.sold);

// Best seller  
let bestSellerProduct = document.getElementById("best-seller-product");
for (let index = 0; index < 4; index++) {
    bestSellerProduct.innerHTML += `
        <div class="card" style="width: 17.5rem;margin-bottom:50px">
            <img src="${productList[index].images[0]}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${productList[index].name}</h5>
                <p class="card-text">${productList[index].price}</p>
                <p class="card-text rating">Rating: ${productList[index].rating}</p>
                <p class="card-text sold">Lượt bán: ${productList[index].sold}</p>
                <p class="card-text des">${productList[index].description}</p>
                <a href="./product-detail.html?id=${productList[index].id}" class="btn btn-primary">Xem sản phẩm</a>
                <a href="#" class="btn btn-primary add-to-cart-btn" style="margin-top:10px">Add to cart</a>
            </div>
        </div>
    `;
}
document.addEventListener("DOMContentLoaded", function() {
    // Function to update cart count
    function updateCartCount() {
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        let cartKey = "";
        if (userLogin) {
            const username = userLogin.username;
            cartKey = "cart_" + username;
        }
        let cartItems = JSON.parse(localStorage.getItem(cartKey));
        let cartCountElement = document.getElementById("cart-count");
        if (cartItems && cartItems.length > 0) {
            cartCountElement.textContent = cartItems.length;
            cartCountElement.style.display = "inline-block";
        } else {
            // Display 0 if there are no items in the cart
            cartCountElement.textContent = '0';
            cartCountElement.style.display = "inline-block";
        }
    }

    // Update cart count initially when DOM is loaded
    updateCartCount();

    // Elements
    let cartButton = document.getElementById("link-cart");
    let cartContainer = document.getElementById("cart-container");
    let hideTimer;

    // Event listener for mouseover on cart button
    cartButton.addEventListener("mouseover", function() {
        clearTimeout(hideTimer);
        showCart();
    });

    cartButton.addEventListener("mouseout", startHideTimer);

    // Function to show cart
    function showCart() {
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        let cartKey = "";
        if (userLogin) {
            const username = userLogin.username;
            cartKey = "cart_" + username;
        }
        let cartItems = JSON.parse(localStorage.getItem(cartKey));
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
                    <button class="btn btn-danger mt-2 delete-item" data-id="${product.id}">Xóa</button>
                `;

                cardDiv.appendChild(img);
                cardDiv.appendChild(cardBody);
                cartTable.appendChild(cardDiv);
            });

            let deleteAllButton = document.createElement("button");
            deleteAllButton.classList.add("btn", "btn-danger", "mt-2");
            deleteAllButton.textContent = "Xóa tất cả";
            deleteAllButton.addEventListener("click", clearCart);
            cartTable.appendChild(deleteAllButton);
        } else {
            cartTable.innerHTML = '<p>Giỏ hàng đang trống</p>';
        }

        cartContainer.style.display = "block";

        let deleteButtons = document.querySelectorAll(".delete-item");
        deleteButtons.forEach(function(button) {
            button.addEventListener("click", function() {
                let productId = button.getAttribute("data-id");
                if (productId) {
                    removeItemFromCart(productId, cartKey);
                }
            });
        });
    }

    // Function to start hide timer
    function startHideTimer() {
        hideTimer = setTimeout(function() {
            cartContainer.style.display = "none";
        }, 5000);
    }

    // Function to remove item from cart
    function removeItemFromCart(productId, cartKey) {
        let cartItems = JSON.parse(localStorage.getItem(cartKey));
        let updatedCart = cartItems.filter(function(product) {
            return product.id !== parseInt(productId);
        });
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        // Show updated cart after removing item
        showCart();
        // Update cart count
        updateCartCount();
    }

    // Function to clear cart
    function clearCart() {
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        let cartKey = "";
        if (userLogin) {
            const username = userLogin.username;
            cartKey = "cart_" + username;
        }
        localStorage.removeItem(cartKey);
        let cartTable = document.getElementById("cart-table");
        cartTable.innerHTML = "<p>Giỏ hàng đã được xóa trống</p>";
        // Update cart count after clearing cart
        updateCartCount();
    }

    // Lắng nghe sự kiện click trên tất cả các nút "Add to cart"
    let addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của nút (chẳng hạn chuyển hướng đến một trang khác)

        // Lấy thông tin của user đăng nhập từ Local Storage
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));

        // Kiểm tra xem user đã đăng nhập hay chưa
        if (!userLogin) {
            // Nếu chưa đăng nhập, không thực hiện thêm sản phẩm vào giỏ hàng
            alert("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng ")
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

        // Tạo tên cart theo user name
        let cartKey = "";
        if (userLogin) {
            const username = userLogin.username;
            cartKey = "cart_" + username;
        }

        // Lấy giỏ hàng từ Local Storage hoặc tạo mới nếu chưa tồn tại
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        // Thêm sản phẩm vào giỏ hàng
        cart.push(product);

        // Lưu giỏ hàng mới vào Local Storage
        localStorage.setItem(cartKey, JSON.stringify(cart));

        // Hiển thị thông báo cho người dùng
        alert("Sản phẩm đã được thêm vào giỏ hàng!");

        // Cập nhật số lượng sản phẩm trong giỏ hàng trên giao diện
        updateCartCount();
        });
    });
});

//Tìm kiếm
document.getElementById("searchButton").addEventListener("click", function(event) {
    event.preventDefault(); 
    searchProduct(); 
});

// Hàm thực hiện tìm kiếm sản phẩm
function searchProduct() {
    let searchName = document.getElementById("searchInput").value;
    let productSearch = productList.filter(value =>{
        return value.name.toUpperCase().includes(searchName.toUpperCase());
    })
    localStorage.removeItem("productSearch");
    localStorage.setItem("productSearch",JSON.stringify(productSearch));
    window.location.href = "./search-product.html";
}