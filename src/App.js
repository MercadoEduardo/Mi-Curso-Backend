import express, { urlencoded } from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import __dirname from "./utils.js";
import Routerproducts from "./routes/Product.Routes.js";
import CartsCreateProduct from "./routes/Carts.Routes.js";
import viewsRoutes from "./routes/View.Routes.js";
import ProductManager from "./ProductManager-2.js";

const app = express();
const port = 8080; // Puede variar
const httpServer = app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

const socketServer = new Server(httpServer);
const productManager = new ProductManager();

socketServer.on('connection', async (socket) => {
  console.log("Cliente conectado", socket.id);
  socket.emit('products', await productManager.getProducts())

  socket.on("mensajeDelCliente", (data) => {
    console.log("Mensaje del cliente:", data);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public')); 

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use((req, res, next) => {
  req.context = { socketServer };
  next();
});

app.use("/api/products", Routerproducts);
app.use("/api/carts", CartsCreateProduct);
app.use("/", viewsRoutes);
