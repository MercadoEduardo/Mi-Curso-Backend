import express, { urlencoded } from "express";
import CartsCreateProduct from "./routes/Carts.Routes.js";
import Routerproducts from "./routes/View.Routes.js";

const app = express();
const port = 8080; // Puede variar

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/products", Routerproducts);

app.use("/api/carts", CartsCreateProduct);
