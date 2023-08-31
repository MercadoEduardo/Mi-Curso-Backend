import ProductManager from "../ProductManager-2.js";
import CartsManager from "../CartsManager.js";
import { Router } from "express";
import express from "express";

const router = Router();
const productManager = new ProductManager();
const managerCart = new CartsManager();
const app = express();
app.use(express.json());

router.post("/", async (req, res) => {
  try {
    const cartId = await managerCart.createCart();

    res.status(201).json({ cartId });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Ocurrió un error en el servidor");
  }
});

router.get("/:cid", async (req, res) => {
  const id = await parseInt(req.params.cid, 10);
  try {
    const cart = await managerCart.getCartById(id);
    res.json({ cart });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid, 10);
    const productId = parseInt(req.params.pid, 10);
    const quantity = parseInt(req.body.quantity, 10);

    let cart = await managerCart.getCartById(cartId);
    if (!cart) {
      cart = await managerCart.createCart();
    }

    await managerCart.addToCart(cartId, quantity, productId);

    res.status(200).json({ message: "Producto agregado al carrito con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
