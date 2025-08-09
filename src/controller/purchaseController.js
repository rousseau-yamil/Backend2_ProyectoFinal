// src/controllers/purchase.controller.js
import { PurchaseService } from '../services/purchase.service.js'

const purchaseService = new PurchaseService()

export const generatePurchase = async (req, res) => {
  try {
    const ticket = await purchaseService.generatePurchase(req.user)
    // res.status(201).json({ status: 'success', payload: ticket })
     res.status(201).json({ status: 'success', payload: ticketDTO })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
}
