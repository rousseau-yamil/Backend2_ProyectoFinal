

// src/controllers/cart.controller.js
import ticketDTO from '../dto/ticketDTO.js'
import TicketDTO from '../dto/ticketDTO.js'
import ticketRepository from '../repository/ticketRepository.js'
import cartService from '../services/cart.service.js'
import { v4 as uuidv4 } from 'uuid'

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params
    const { quantity } = req.body

    const updatedCart = await cartService.addProduct(cid, pid, quantity || 1)

    res.status(200).json({
      status: 'success',
      message: 'Producto agregado al carrito',
      cart: updatedCart
    })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
}

export const checkoutCart = async (req, res) => {
  try {
    const user = req.user // viene de passport JWT
    //const cart = await cartService.getCartById(user.cartID)
    let cart = await cartService.getCartById(user.cartID )
    cart = await cart.populate('products.product')

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' })
    }

    let totalAmount = 0
    let productosComprados = []

    // for (const item of cart.products) {
    //   const producto = item.product
    //   const cantidad = item.quantity

    //   if (producto.stock >= cantidad) {
    //     // Restar stock en DB
    //     producto.stock -= cantidad
    //     await producto.save()

    //     // Calcular subtotal
    //     const subtotal = producto.price * cantidad
    //     totalAmount += subtotal
    for (const item of cart.products) {
      const producto = item.product
      const cantidad = item.quantity

      if(!producto) continue

      if (producto.stock >= cantidad) {
        producto.stock -= cantidad
        await producto.save() 

        const subtotal = producto.price * cantidad

        totalAmount += subtotal

        // Agregar al detalle de compra
        productosComprados.push({
          product: producto._id,
          quantity: cantidad,
          price: producto.price,
          subtotal
        })
      }
    }
    if (productosComprados.length === 0) {
      return res.status(400).json({ error: 'No hay stock suficiente para procesar la compra' })
    }

    if (productosComprados.length > 0) {
      // Crear ticket con detalle de productos
      const ticket = await ticketRepository.createTicket({
        code: uuidv4(),
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: user.email,
        products: productosComprados
      })

      // Vaciar carrito completamente después de la compra
      //Version 1
      //await cartService.updateCart(user.cartID, { products: [] })

      //vaciamos el carrito
      cart.products = []
      await cart.save()

      console.log(`ticket: ${ticket}`)
      let ticket2 = new ticketDTO(ticket)

      return res.status(201).json({
        message: 'Compra realizada',
        ticket2
      })
    } else {
      return res.status(400).json({ error: 'No hay stock suficiente para procesar la compra' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }
}

export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params
    const updatedCart = await cartService.removeProductFromCart(cid, pid)
    res.status(200).json({ message: 'Producto eliminado del carrito', cart: updatedCart })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


export const getCart = async (req, res) => {
  try {
    // Asumimos que el usuario logueado tiene el cartID en req.user
    const cart = await cartService.getCartById(req.user.cartID)

    res.status(200).json({
      status: 'success',
      payload: cart
    })
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message })
  }
}


export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params
    const cart = await cartService.clearCart(cid)

    res.status(200).json({
      status: 'success',
      message: 'Carrito vaciado correctamente',
      cart
    })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
}