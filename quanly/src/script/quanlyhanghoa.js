// Lấy dữ liệu sản phẩm từ localStorage (nếu có) hoặc tạo một mảng rỗng
const products = JSON.parse(localStorage.getItem("products")) || [];

// Lấy thẻ tbody từ HTML để chèn dữ liệu sản phẩm vào
const tbody = document.getElementById("tbody");

// Hàm để xóa một sản phẩm
function deleteProduct(product) {
   let confirmDelete = confirm("Bạn có chắc muốn xóa không??")
   if(!confirmDelete){
        return;
    }
  // Tìm vị trí của sản phẩm trong mảng và xóa nó
  const index = products.findIndex((p) => p.id === product.id);
  if (index !== -1) {
    products.splice(index, 1);
    // Lưu lại dữ liệu sản phẩm đã thay đổi vào localStorage
    localStorage.setItem("products", JSON.stringify(products));
    // Render lại bảng
    renderProducts();
  }
}

// Hàm để render thông tin sản phẩm vào bảng
function renderProducts() {
  // Xóa nội dung hiện tại của tbody
  tbody.innerHTML = "";

  // Duyệt qua mỗi sản phẩm và tạo một hàng trong bảng
  products.forEach((product, index) => {
    const row = document.createElement("tr");

    // Thêm STT
    const sttCell = document.createElement("td");
    sttCell.textContent = index + 1;
    row.appendChild(sttCell);

    // Thêm tên sản phẩm
    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;
    row.appendChild(nameCell);
    
    const brandCell = document.createElement("td");
    brandCell.textContent = product.brand;
    row.appendChild(brandCell);

    const sizeCell = document.createElement("td");
    sizeCell.textContent = product.size;
    row.appendChild(sizeCell);

    const soldCell = document.createElement("td");
    soldCell.textContent = product.sold;
    row.appendChild(soldCell);

    // Thêm nút hành động
    const actionCell = document.createElement("td");
    const actionButton = document.createElement("button");
    actionButton.textContent = "Xóa";
    actionButton.addEventListener("click", () => {
      deleteProduct(product);
    });
    actionCell.appendChild(actionButton);
    row.appendChild(actionCell);

    // Thêm hàng vào tbody
    tbody.appendChild(row);
  });
}

// Render thông tin sản phẩm ban đầu vào bảng
renderProducts();

// Lấy nút "Thêm sản phẩm" từ HTML
const addProductButton = document.getElementById("add-product-button");
// Tìm kiếm
document.getElementById("searchButton").addEventListener("click", function(event) {
    event.preventDefault(); 
    searchProduct();
    renderSearchProducts();
});


// Hàm thực hiện tìm kiếm sản phẩm
function searchProduct() {
    let searchName = document.getElementById("searchInput").value;
    let searchResult = products.filter(value => {
        return value.name.toUpperCase().includes(searchName.toUpperCase());
    });
    localStorage.removeItem("productSearch");
    localStorage.setItem("productSearch", JSON.stringify(searchResult));
}

// Hàm để render thông tin sản phẩm vào bảng
function renderSearchProducts() {
    // Xóa nội dung hiện tại của tbody
    tbody.innerHTML = "";

    // Lấy danh sách sản phẩm từ localStorage
    let searchResult = JSON.parse(localStorage.getItem("productSearch")) || [];

    // Duyệt qua mỗi sản phẩm và tạo một hàng trong bảng
    searchResult.forEach((product, index) => {
        const row = document.createElement("tr");

        // Thêm STT
        const sttCell = document.createElement("td");
        sttCell.textContent = index + 1;
        row.appendChild(sttCell);

        // Thêm tên sản phẩm
        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const brandCell = document.createElement("td");
        brandCell.textContent = product.brand;
        row.appendChild(brandCell);

        const sizeCell = document.createElement("td");
        sizeCell.textContent = product.size;
        row.appendChild(sizeCell);

        const soldCell = document.createElement("td");
        soldCell.textContent = product.sold;
        row.appendChild(soldCell);

        // Thêm nút hành động
        const actionCell = document.createElement("td");
        const actionButton = document.createElement("button");
        actionButton.textContent = "Xóa";
        actionButton.addEventListener("click", () => {
            deleteProduct(product);
        });
        actionCell.appendChild(actionButton);
        row.appendChild(actionCell);

        // Thêm hàng vào tbody
        tbody.appendChild(row);
    });
}
