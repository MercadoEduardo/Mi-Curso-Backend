import fs from "fs";
class CartsManager {
  cart;
  static id = 0;

  constructor() {
    this.path = "./CartsManager.json";
    this.productosEnCarrito = [];
    this.nextCartId = 1;
  }

  async saveCartsToFile(filePath) {
    try {
      await fs.promises.writeFile(
        filePath,
        JSON.stringify(this.cart, null, "\t")
      );
    } catch (error) {
      console.error("Error al guardar el carrito en el archivo:", error);
    }
  }

  async createCart() {
    try {
      const newCart = {
        id: this.nextCartId++,
        cart: [],
      };
      this.productosEnCarrito.push(newCart);

      await this.saveCartsToFile("../CartsManager.json");
      return newCart.id;
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(productId, quantity) {
    try {
      const product = await this.productManager.getCartById(productId);

      if (product) {
        const existingCartItem = this.cart.find(
          (item) => item.id === productId
        );

        if (existingCartItem) {
          existingCartItem.quantity += quantity;
        } else {
          this.cart.push({ id: productId, quantity });
        }

        CartsManager.id++;
        console.log(
          `Se agregaron ${quantity} unidades de "${product.title}" al carrito.`
        );
        await this.saveCartToFile("../CartsManager.json");
      } else {
        console.log(`El producto con ID ${productId} no existe.`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async getCarts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al mostrar los productos:", error.message);
      throw error;
    }
  }
  async getCartById(id) {
    try {
      const data = await this.getCarts();
      const product = data.find((product) => product.id === id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CartsManager;
