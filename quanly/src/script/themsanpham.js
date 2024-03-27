document.addEventListener("DOMContentLoaded", function() {
    const addProductForm = document.getElementById("add-product-form");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const lastProduct = products[products.length-1];

    addProductForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const brand = document.getElementById("brand").value;
        const price = parseInt(document.getElementById("price").value);
        const description = document.getElementById("description").value;
        const id = lastProduct.id + 1;
        const size = parseInt(document.getElementById("size").value);
        const rating = parseFloat(document.getElementById("rating").value);
        const sale = parseInt(document.getElementById("sale").value);
        const status = document.getElementById("status").checked;
        const sold = 0;
        const type = parseInt(document.getElementById("productType").value);
        const images = document.getElementById("images").value.split(",").map(item => item.trim());

        const newProduct = {
            name: name,
            brand: brand,
            price: price,
            description: description,
            id: id,
            size: size,
            rating: rating,
            sale: sale,
            status: status,
            sold: sold,
            type: type,
            images: images
        };
        
        products.push(newProduct);

        localStorage.setItem("products", JSON.stringify(products));

        addProductForm.reset();
        window.location.href = "./quanlyhanghoa.html";
    });
});
