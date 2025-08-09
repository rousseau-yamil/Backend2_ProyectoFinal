// src/dto/ticket.dto.js
//  class TicketDTO {
//   constructor(ticket, populatedProducts = []) {
//     this.code = ticket.code
//     this.purchaser = ticket.purchaser
//     this.purchase_datetime = ticket.purchase_datetime
//     this.total = ticket.amount
//     this.products = ticket.products.map(item => {
//       const productData = populatedProducts.find(p => p._id.toString() === item.product.toString())
//       return {
//         name: productData?.title || 'Producto desconocido',
//         price: item.price,
//         quantity: item.quantity,
//         subtotal: item.subtotal,
//       }
//     })
//   }
// }

// export default TicketDTO

// src/dto/ticket.dto.js


//TICKET ANTERIOR

// export default class TicketDTO {
//   constructor(ticket) {
//     this.code = ticket.code
//     this.date = ticket.purchase_datetime
//     this.total = ticket.amount
//     this.purchaser = ticket.purchaser
//     this.products = ticket.products.map(p => ({
//       // productId: p.product,
//       title: p.product?.title || null,
//       quantity: p.quantity,
//       price: p.price,
//       subtotal: p.subtotal
//     }))
//   }
// }

export default function ticketDTO(ticket) {
  return {
    purchaser: ticket.purchaser,
    purchase_datetime: ticket.purchase_datetime,
    products: ticket.products.map(p => ({
      title: p.product.title,
      quantity: p.quantity,
      unitPrice: p.price
    })),
    amount: ticket.amount
  }
}