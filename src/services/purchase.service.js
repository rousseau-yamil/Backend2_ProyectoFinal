// src/services/purchase.service.js
import ticketModel from '../dao/models/ticketModel.js';
import { v4 as uuidv4 } from 'uuid';
import  productDAO  from '../dao/productDAO.js';
import  TicketDTO  from '../dto/ticketDto.js';
import { CartDAO } from '../dao/cartDAO.js';
const cartDAO = new CartDAO();

// const cartDAO = new CartDAO();
// const productDAO = new ProductDAO();

export class PurchaseService {
  async generatePurchase(user) {
    const cart = await cartDAO.getCartById(user.cartID);
    if (!cart || cart.products.length === 0) throw new Error('El carrito está vacío');

    const ticketProducts = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await productDAO.getById(item.product._id);
      const subtotal = product.price * item.quantity;

      ticketProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        subtotal
      });

      totalAmount += subtotal;
    }

    const ticket = await ticketModel.create({
      code: uuidv4(),
      amount: totalAmount,
      purchaser: user.email,
      products: ticketProducts,
    });

    await cartDAO.clearCart(user.cartID); // Vacia el carrito luego de la compra
    const populatedProducts = await Promise.all(
      ticket.products.map(p => productDAO.getById(p.product))
    );

    return new TicketDTO(ticket, populatedProducts);


    // return ticket;
  }
}
