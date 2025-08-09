import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String, // email del usuario
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
      },
      quantity: Number,
      price: Number,
      subtotal: Number,
    },
  ],
})

const ticketModel = mongoose.model('Ticket', ticketSchema)

export default ticketModel
