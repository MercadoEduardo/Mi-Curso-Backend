import express, { urlencoded } from "express";
import CartsCreateProduct from "./routes/Carts.Routes.js";
import Routerproducts from "./routes/Product.Routes.js";
import viewsRoutes from "./routes/View.Routes.js";
import __dirname from "./utils.js";
import exphbs from "express-handlebars"; // handlebars
import { Server } from "socket.io";

const app = express();
const port = 8080; // Puede variar
const httpServer = app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/products", Routerproducts);

app.use("/api/carts", CartsCreateProduct);

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");


app.use(express.static(__dirname + "/src/public"));
app.use("/", viewsRoutes);
