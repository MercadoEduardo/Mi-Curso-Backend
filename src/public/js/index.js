const socket = io();

// const productContainer = document.getElementById("product");

// socket.on("products", (products) => {
//   const title = products.map((product) => product.title);

//   productContainer.innerHTML = title.join("<br></br>");
// });

// socket.on("Put_products", (products) => {
//   const title = products.map((product) => product.title);

//   productContainer.innerHTML = title.join("<br></br>");
// });

const productContainer = document.getElementById("product");

document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    productTitle: document.getElementById("productTitle").value,
    productDescription: document.getElementById("productDescription").value,
    productPrice: document.getElementById("productPrice").value,
    producThumbnail: document.getElementById("producThumbnail").value,
    productId: document.getElementById("productId").value,
    productStock: document.getElementById("productStock").value,
    productState: document.getElementById("productState").value,
    productCode: document.getElementById("productCode").value,
    productCategory: document.getElementById("productCategory").value,
  };

  socket.emit("submitProductForm", formData);
});

socket.on("Put_products", (products) => {
  const title = products.map((product) => product.title);

  productContainer.innerHTML = title.join("<br></br>");
});
