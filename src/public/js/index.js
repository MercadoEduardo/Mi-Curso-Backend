const socket = io();

socket.emit("message", "hola desde websocket");
const productContainer = document.getElementById("products");

socket.on("products", (products) => {
  const title = products.map((product) => product.title);

  productContainer.innerHTML = title.join("<br></br>");
});

socket.on("Put_products", (products) => {
  const title = products.map((product) => product.title);

  productContainer.innerHTML = title.join("<br></br>");
});

console.log("hola dev");
