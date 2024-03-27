// Lấy dữ liệu người dùng từ localStorage (nếu có) hoặc tạo một mảng rỗng
const users = JSON.parse(localStorage.getItem("users")) || [];

// Lấy thẻ tbody từ HTML để chèn dữ liệu người dùng vào
const tbody = document.getElementById("tbody");

// Hàm để chặn một người dùng
function blockUser(user) {
  // Tìm kiếm người dùng trong mảng "users" và thay đổi trạng thái thành "Đang bị chặn"
  const blockedUser = users.find((u) => u.username === user.username);
  if (blockedUser) {
    blockedUser.status = "Đang bị chặn";
  }

  // Lưu lại dữ liệu người dùng đã thay đổi vào localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Render lại bảng
  renderUsers();
}

// Hàm để bỏ chặn một người dùng
function unblockUser(user) {
  // Tìm kiếm người dùng trong mảng "users" và thay đổi trạng thái thành "Được phép truy cập "
  const unblockedUser = users.find((u) => u.username === user.username);
  if (unblockedUser) {
    unblockedUser.status = "Được phép truy cập";
  }

  // Lưu lại dữ liệu người dùng đã thay đổi vào localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Render lại bảng
  renderUsers();
}

// Hàm để render thông tin người dùng vào bảng
function renderUsers() {
  // Xóa nội dung hiện tại của tbody
  tbody.innerHTML = "";

  // Duyệt qua mỗi người dùng và tạo một hàng trong bảng
  users.forEach((user, index) => {
    const row = document.createElement("tr");

    // Thêm STT
    const sttCell = document.createElement("td");
    sttCell.textContent = index + 1;
    row.appendChild(sttCell);

    // Thêm tên người dùng
    const nameCell = document.createElement("td");
    nameCell.textContent = user.username;
    row.appendChild(nameCell);

    // Thêm email
    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    // Thêm trạng thái hoạt động
    const normalCell = document.createElement("td");
    row.appendChild(normalCell);
    // Lấy dữ liệu người đăng nhập
    const userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];
    if(userLogin.username === user.username){
      normalCell.textContent = "Đang hoạt động";
    }else{
      normalCell.textContent = "Không hoạt động";
    }
    // Thêm bị chặn hay không 
    const statusCell = document.createElement("td");
    statusCell.textContent = user.status;
    row.appendChild(statusCell);

    // Thêm nút hành động
    const actionCell = document.createElement("td");
    const actionButton = document.createElement("button");
    
    if (user.status === "Được phép truy cập") {
      actionButton.textContent = "Chặn";
      actionButton.addEventListener("click", () => {
        blockUser(user);
      });
    } else {
      actionButton.textContent = "Bỏ chặn";
      actionButton.addEventListener("click", () => {
        unblockUser(user);
      });
    }

    actionCell.appendChild(actionButton);
    row.appendChild(actionCell);

    // Thêm hàng vào tbody
    tbody.appendChild(row);
  });
}

// Render thông tin người dùng ban đầu vào bảng
renderUsers();
// Tìm kiếm
document.getElementById("searchButton").addEventListener("click", function(event) {
    event.preventDefault(); 
    renderSearchUser();
});

// Hàm để render thông tin người dùng vào bảng
function renderSearchUser() {
    // Lấy giá trị tìm kiếm từ input
    let searchName = document.getElementById("searchInput").value.trim().toUpperCase();
    
    // Lấy danh sách người dùng từ localStorage hoặc mảng rỗng nếu chưa có dữ liệu
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Lọc danh sách người dùng dựa trên tên tìm kiếm
    const searchResult = users.filter(user => user.username.toUpperCase().includes(searchName));

    // Xóa nội dung hiện tại của tbody
    tbody.innerHTML = "";

    // Kiểm tra nếu không có kết quả tìm kiếm
    if (searchResult.length === 0) {
        const noResultRow = document.createElement("tr");
        const noResultCell = document.createElement("td");
        noResultCell.setAttribute("colspan", "6");
        noResultCell.textContent = "Không có kết quả tìm kiếm";
        noResultRow.appendChild(noResultCell);
        tbody.appendChild(noResultRow);
        return; // Dừng hàm nếu không có kết quả
    }

    // Duyệt qua mỗi người dùng trong kết quả tìm kiếm và tạo một hàng trong bảng
    searchResult.forEach((user, index) => {
        const row = document.createElement("tr");

        // Thêm STT
        const sttCell = document.createElement("td");
        sttCell.textContent = index + 1;
        row.appendChild(sttCell);

        // Thêm tên người dùng
        const nameCell = document.createElement("td");
        nameCell.textContent = user.username;
        row.appendChild(nameCell);

        // Thêm email
        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        // Thêm trạng thái hoạt động
        const normalCell = document.createElement("td");
        // Lấy dữ liệu người đăng nhập
        const userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];
        normalCell.textContent = userLogin.username === user.username ? "Đang hoạt động" : "Không hoạt động";
        row.appendChild(normalCell);

        // Thêm trạng thái bị chặn hoặc không
        const statusCell = document.createElement("td");
        statusCell.textContent = user.status;
        row.appendChild(statusCell);

        // Thêm nút hành động
        const actionCell = document.createElement("td");
        const actionButton = document.createElement("button");
        if (user.status === "Được phép truy cập") {
            actionButton.textContent = "Chặn";
            actionButton.addEventListener("click", () => {
                blockUser(user);
            });
        } else {
            actionButton.textContent = "Bỏ chặn";
            actionButton.addEventListener("click", () => {
                unblockUser(user);
            });
        }
        actionCell.appendChild(actionButton);
        row.appendChild(actionCell);

        // Thêm hàng vào tbody
        tbody.appendChild(row);
    });
}
