

// src/services/cart.service.js
import cartRepository from '../repository/cartRepository.js';
import ticketModel from '../dao/models/ticketModel.js';
import { v4 as uuidv4 } from 'uuid';
import TicketDTO from '../dto/ticketDTO.js';



class CartService {
  async checkout(cartId, userEmail) {
    const cart = await cartRepository.getCartById(cartId);

    if (!cart || cart.products.length === 0) {
      throw new Error('El carrito está vacío o no existe');
    }

    // Calcular totales y productos del ticket
    const ticketProducts = cart.products.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
      subtotal: item.product.price * item.quantity
    }));

    const totalAmount = ticketProducts.reduce((acc, p) => acc + p.subtotal, 0);

    // Crear ticket
    const ticket = await ticketModel.create({
      code: uuidv4(),
      purchaser: userEmail,
      amount: totalAmount,
      products: ticketProducts
    });

    console.log(`Ticket: ${ticket}`)
    // Vaciar carrito
    await cartRepository.clearCart(cartId);
    const ticketDTOs = TicketDTO(ticket)
    // return ticket;
    console.log(`TicketDTO: ${ticketDTOs}`)
    
    return ticketDTOs
  }

    async createCart() {
    const cart = await cartRepository.createCart({});
    return cart; // products: [] por defecto
  }

  async addProduct(cartId, productId, quantity = 1) {
    const updatedCart = await cartRepository.addProductToCart(
      cartId,
      productId,
      quantity
    );
    return updatedCart;
  }
  
  async getCartById(cartId) {
    const cart = await cartRepository.getCartById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');
    return cart;
  }
  
  async updateCart(cartId, updateData) {
    return await cartRepository.updateCart(cartId, updateData);
  }

  async clearCart(cartId) {
    return await cartRepository.clearCart(cartId);
  }

  async removeProductFromCart(cartId, productId) {
  return await cartRepository.removeProduct(cartId, productId);
}
}

export default new CartService();
