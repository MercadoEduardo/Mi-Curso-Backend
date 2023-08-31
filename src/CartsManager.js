import fs from "fs";
class CartsManager {
  static id = 0;

  constructor() {
    this.path = "./CartsManager.json";
    this.productosEnCarrito = [];
    this.nextCartId = 1;
    this.ProductsID = 1;
    this.quantity = 1;
  }

  async saveCartsToFile(filePath) {
    try {
      await fs.promises.writeFile(
        filePath,
        JSON.stringify(this.productosEnCarrito, null, "\t")
      );
    } catch (error) {
      console.error("Error al guardar el carrito en el archivo:", error);
    }
  }

  async createCart() {
    try {
      const newCart = {
        id: this.nextCartId++,
        products: [],
      };
      this.productosEnCarrito.push(newCart);

      await this.saveCartsToFile("../CartsManager.json");
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCarts(filePath) {
    try {
      const data = await fs.promises.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al mostrar los productos:", error.message);
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const data = await this.getCarts(this.path);
      const product = data.find((product) => product.id === id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(cartId, quantity, productId) {
    try {
      await this.getCarts(this.path);
      let cart = await this.productosEnCarrito.find((cart) => cart.id === cartId);

      if (!cart) {
        const newCart = {
          id: cartId,
          products: [],
        };
        this.productosEnCarrito.push(newCart);
        cart = newCart;
      }else{
        this.productosEnCarrito.push(cart);
      }

      const product = await cart.products.find((p) => p.id === productId);

      if (!product) {
        const newProduct = {
          id: productId,
          quantity: quantity,
        };
        cart.products.push(newProduct);
      } else {
        product.quantity += quantity;
      }

      await this.saveCartsToFile(this.path);
    } catch (error) {
      console.log(error);
    }
  }
}

export default CartsManager;
