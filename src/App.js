const express = require("express");
const app = express();
const port = 8080; // Puede variar

const ProductManager = require("./ProductManager-2.js");

const productManager = new ProductManager();

app.get("/", async (req, res) => {
  res.send("¡Bienvenido a la página principal!");
});

app.get("/productos", async (req, res) => {
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

app.get("/productos/:productid", async (req, res) => {
  const id = await parseInt(req.params.productid, 10);
  try {
    const product = await productManager.getProductById(id);
    res.json({ product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
