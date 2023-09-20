import { Router } from "express";
import ProductManager from "../ProductManager-2.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  req.context.socketServer.emit();
  const products = await productManager.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    req.context.socketServer.emit(); 
    const products = await productManager.getProducts();
    res.render("realtimeproducts", { products });
  } catch (error) {
    console.error("Error en la ruta '/realtimeproducts':", error);
    res.status(500).send("Ocurrió un error en la solicitud.");
  }
});

router.post("/realtimeproducts", async (req, res) => {
  try {
    req.context.socketServer.emit(); 
    const products = await productManager.getProducts();
    res.render("realtimeproducts", { products });
  } catch (error) {
    console.error("Error en la ruta '/realtimeproducts':", error);
    res.status(500).send("Ocurrió un error en la solicitud.");
  }
});

export default router;
