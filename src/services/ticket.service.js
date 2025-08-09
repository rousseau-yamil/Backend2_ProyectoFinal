import ticketRepository from '../repository/ticketRepository.js'
import cartRepository from '../repository/cartRepository.js'
//import productRepository from '../repository/product.repository.js'
import { v4 as uuidv4 } from 'uuid'

class TicketService {
  async generateTicketFromCart(user) {
    const cart = await cartRepository.getCartById(user.cartID)
    if (!cart || cart.products.length === 0) {
      throw new Error('El carrito está vacío')
    }

    let totalAmount = 0
    const purchasedProducts = []

    for (const item of cart.products) {
      const product = await productRepository.getById(item.product._id)

      if (!product) continue
      if (product.stock < item.quantity) continue

      const subtotal = product.price * item.quantity
      totalAmount += subtotal

      purchasedProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        subtotal,
      })

      // Descontar stock
      product.stock -= item.quantity
      await product.save()
    }

    if (purchasedProducts.length === 0) {
      throw new Error('No hay productos con stock suficiente')
    }

    const ticket = await ticketRepository.createTicket({
      code: uuidv4(),
      amount: totalAmount,
      purchaser: user.email,
      products: purchasedProducts,
    })

    // Limpiar carrito
    await cartRepository.clearCart(user.cartID)

    return ticket
  }
}

export default new TicketService()
