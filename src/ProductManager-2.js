import fs from "fs"
class ProductManager {
  product;
  static id = 0;

  constructor() {
    this.product = [];
    this.path = "./ProductManager.json";
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al mostrar los productos:", error.message);
      throw error;
    }
  }

  async loadProductsFromFile(filePath) {
    try {
      const data = await fs.promises.readFile(filePath, "utf8");
      this.product = JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar productos desde el archivo:", error);
    }
  }

  async saveProductsToFile(filePath) {
    try {
      await fs.promises.writeFile(
        filePath,
        JSON.stringify(this.product, null, "\t")
      );
    } catch (error) {
      console.error("Error al guardar productos en el archivo:", error);
    }
  }

  async Addproducts(title, description, price, thumbnail, id, stock, status) {
    try {
      await this.loadProductsFromFile(this.path);
      const existProduct = this.product.find((product) => product.id === id);
      if (existProduct) {
        console.log(`Error: El código "${id}" ya está en uso.`);
        return;
      }
      if (!title || !description || !price || !thumbnail || !id || !stock || !status || !code || !category) {
        console.log("Error: Todos los campos son obligatorios.");
        return
      }
      const product = {
        title,
        description,
        price,
        thumbnail,
        id,
        stock,
        status,
        code,
        category,
      };

      this.product.push(product);
      ProductManager.id++;
      await this.saveProductsToFile("./ProductManager.json");
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const data = await this.getProducts();
      const product = data.find((product) => product.id === id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const data = await this.getProducts();
      const updatedData = data.splice((product) => product.id !== id);

      if (updatedData.length !== data.length) {
        const data = updatedData;
        await fs.promises.writeFile(this.path, JSON.stringify(data));
      } else {
        console.log(`Producto con ID (${id}) no encontrado.`);
      }
    } catch (error) {
      console.error(`Ocurrió un error: ${error}`);
    }
  }

  async updateProduct(id, product) {
    try {
      const data = await this.getProducts();
      let i = data.find((e) => e.id === id);

      product.id = id;
      data.splice(i, 1, product);

      await fs.promises.writeFile(this.path, JSON.stringify(data));

      console.log("Producto actualizado con exito");
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  }
}

export default ProductManager
