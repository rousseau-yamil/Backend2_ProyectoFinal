import cartModel from './models/cartModel.js'

export class CartDAO {
  async createCart() {
    return await cartModel.create({})
  }

  async getCartById(cartId) {
    return await cartModel.findById(cartId).populate('products.product')
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await cartModel.findById(cartId)
    if (!cart) throw new Error('Carrito no encontrado')

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId)

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity
    } else {
      cart.products.push({ product: productId, quantity })
    }

    return await cart.save()
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await cartModel.findById(cartId)
    if (!cart) throw new Error('Carrito no encontrado')

    cart.products = cart.products.filter(p => p.product.toString() !== productId)
    return await cart.save()
  }

  async clearCart(cartId) {
    const cart = await cartModel.findById(cartId)
    if (!cart) throw new Error('Carrito no encontrado')

    cart.products = []
    return await cart.save()
  }

  async updateCart(cartId, products) {
    const cart = await cartModel.findByIdAndUpdate(
      cartId,
      { products },
      { new: true }
    )
    if (!cart) throw new Error('Carrito no encontrado')
    return cart
  }
}
