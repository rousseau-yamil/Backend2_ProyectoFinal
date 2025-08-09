
// export default router;

import { Router } from 'express';
import passport from 'passport';
import { getCart, addProductToCart, clearCart, checkoutCart,removeProductFromCart } from '../controller/cartController.js';
//import ticketDTO from '../dto/ticketDTO.js';

const router = Router();

//obtener carrito
router.get('/:cid', passport.authenticate('jwt', { session: false }), getCart);

//agregar productos al carrito con quantity en body
router.post('/:cid/productos/:pid', passport.authenticate('jwt', { session: false }), addProductToCart);

//Limpiar carrito (el usuario es el dueño del carrito no se puede eliminar)
router.delete('/:cid', passport.authenticate('jwt', { session: false }), clearCart);

//Compra y generacion del ticket
router.post('/:cid/checkout',passport.authenticate('jwt', { session: false }),  checkoutCart)

//Quitar productos del carritoss
router.delete('/:cid/productos/:pid',passport.authenticate('jwt', { session: false }),  removeProductFromCart
);

export default router