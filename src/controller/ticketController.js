import ticketService from '../services/ticket.service.js'

class TicketController {
  async checkout(req, res) {
    try {
      const user = req.user // viene del JWT
      const ticket = await ticketService.checkout(user.cartID, user.email)
      res.status(201).json({ message: 'Compra realizada', ticket })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }


  async getUserTickets(req, res) {
  try {
    const user = req.user // viene del middleware JWT
    const tickets = await ticketRepository.getTicketsByPurchaser(user.email)

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: 'No se encontraron tickets' })
    }

    res.status(200).json({ tickets })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
}

export default new TicketController()
