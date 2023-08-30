import ProductManager from "../ProductManager-2.js";
import CartsManager from "../CartsManager.js";
import { Router } from "express";
import express from "express";

const router = Router();
const product = new ProductManager();
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
  const cid = parseInt(req.params.cid, 10);
  const pid = parseInt(req.params.pid, 10);
  const carritos = [];

  const carrito = carritos.find((cart) => cart.id === cid);

  if (!carrito) {
    return res.status(404).json({ message: "El carrito no existe." });
  }

  const product = { id: pid };

  carrito.products.push(product);

  res.status(200).json({ message: "Producto agregado al carrito.", product });
});

export default router;
