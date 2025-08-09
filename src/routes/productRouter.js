
// src/routes/product.router.js
import { Router } from 'express';
import { uploader } from '../utils/multerUtil.js';
import passport from 'passport';

import {
    getAllProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controller/productController.js';
import { perfil_auth } from '../middleware/perfil_auth.js';


const router = Router();

// Obtener todos los productos con filtros, paginación y orden
router.get('/',passport.authenticate('jwt'),perfil_auth(['admin', 'user']), getAllProducts);

//Obtener un producto por ID
router.get('/:pid', passport.authenticate('jwt'),perfil_auth(['admin', 'user']), getProductByID);

//router.post('/',passport.authenticate('jwt'),perfil_auth('admin'), uploader.array('thumbnails', 3), createProduct);

//Crear un producto ['admin', 'user']
router.post('/',passport.authenticate('jwt'),perfil_auth('admin'), createProduct);

//Eliminar producto
router.delete('/:pid', passport.authenticate('jwt'),perfil_auth('admin'),deleteProduct)


//router.put('/:pid', uploader.array('thumbnails', 3), updateProduct);

//Actualizar un producto por ID (con imágenes)
router.put('/:pid', passport.authenticate('jwt'),perfil_auth('admin'), updateProduct);

export default router;
