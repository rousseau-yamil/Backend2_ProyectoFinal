
import { CartDAO } from '../dao/cartDAO.js'
const cartDAO = new CartDAO()

class CartRepository {
  async getCartById(cid) {
    return await cartDAO.getCartById(cid)
  }

  async createCart() {
    return await cartDAO.createCart()
  }

  async addProductToCart(cid, pid, quantity = 1) {
    return await cartDAO.addProductToCart(cid, pid, quantity)
  }

  async clearCart(cid) {
    return await cartDAO.clearCart(cid)
  }

  async updateCart(cartId, updateData) {
    // return await cartDAO.findByIdAndUpdate(cartId, updateData, { new: true })
    return await cartDAO.updateCart(cartId, updateData, { new: true })

  }
  
  async removeProduct(cartId, productId) {
  return await cartDAO.removeProductFromCart(cartId, productId)
}
}

export default new CartRepository()
