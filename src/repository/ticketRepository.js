import ticketModel from '../dao/models/ticketModel.js'

class TicketRepository {
  async createTicket(data) {
    return await ticketModel.create(data)
  }

  async getTicketByCode(code) {
    return await ticketModel.findOne({ code })
  }

  async getAllTickets() {
    return await ticketModel.find().populate('products.product')
  }
}

export default new TicketRepository()
