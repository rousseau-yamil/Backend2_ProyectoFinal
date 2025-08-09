// src/routes/sessionRouter.js
import express from 'express'
import userController from '../controller/userController.js'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import {perfil_auth} from '../middleware/perfil_auth.js'
import userTokenDTO from '../dto/userDTO.js'


const router = express.Router()


//router.post('/register',passport.authenticate('register', { session: false }), userController.register)
// router.post('/register', (req, res, next) => {passport.authenticate('register', { session: false }, (err, user, info) => {
//    if (!user) return res.status(400).json({ error: info?.message || 'Error en registro' })
//     req.user = user
//     return userController.register(req, res, next)
//   })(req, res, next)
// })
router.post('/register',passport.authenticate('register', { session: false }),userController.register)

router.post('/login',passport.authenticate('login', { session: false }), userController.login)

//OBTENER USUARIO
router.get('/profile/:id', passport.authenticate('jwt'),userController.getProfile)

//ELIMINAR USUARIO
router.delete('/profile/:id', passport.authenticate('jwt'),perfil_auth('admin'),userController.deleteUser)

//MODIFICAR USUARIO
router.put('/profile/:id',passport.authenticate('jwt'), perfil_auth('admin'),userController.updateProfile)

//TEST
//router.get('/inicio/:id',userController.getProfile)

//CURRENT
router.get('/current',passport.authenticate('jwt', { session: false }), userController.current
)

export default router
