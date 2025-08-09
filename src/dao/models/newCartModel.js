
import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
       // required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    default: null,
  },
})

const cartModel = mongoose.model('Cart', cartSchema)

export default cartModel
