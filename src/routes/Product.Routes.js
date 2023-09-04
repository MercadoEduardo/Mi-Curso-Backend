import express from "express";
import ProductManager from "../ProductManager-2.js";
import { Router } from "express";

const router = Router();
const productManager = new ProductManager();

router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const thumbnail = req.body.thumbnail;
    const id = req.body.id;
    const stock = req.body.stock;
    const status = req.body.status;
    const code = req.body.code;
    const category = req.body.category;

    productManager.Addproducts(
      title,
      description,
      price,
      thumbnail,
      id,
      stock,
      status,
      code,
      category,
    );

    res.status(201).send("Producto agregado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al agregar el producto");
  }
});

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  const { limit } = req.query;

  try {
    if (!products) {
      res.status(404).send("Producto no encontrado");
    } else {
      if (limit && !isNaN(limit) && parseInt(limit) > 0) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.json({ products: limitedProducts });
      } else {
        res.json({ products });
      }
    }
  } catch (err) {
    console.error("Error al leer el archivo de productos:", err);
    res.status(500).json({ error: "No se pudo leer el archivo de productos." });
    return;
  }
});

router.get("/:productid", async (req, res) => {
  const id = await parseInt(req.params.productid, 10);
  try {
    const product = await productManager.getProductById(id);
    res.json({ product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete("/:productid", async (req, res) => {
  const productId = req.params.productid;

  try {
    await productManager.deleteProduct(productId);
    res
      .status(200)
      .json({
        message: `Producto con ID (${productId}) eliminado correctamente`,
      });
  } catch (error) {
    console.error(`Ocurrió un error: ${error}`);
    res.status(500).json({ error: "Ocurrió un error al eliminar el producto" });
  }
});

router.put("/:productid", async (req, res) => {
  try {
    const productId = req.params.productid;
    const updatedProduct = req.body;

    await productManager.updateProduct(productId, updatedProduct);

    res.status(200).json({ message: "Producto actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

export default router;
