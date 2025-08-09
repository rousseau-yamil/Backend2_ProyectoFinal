// src/controllers/user.controller.js
import userService from '../services/user.service.js'
import { generateToken } from '../utils/jwt.js'
import userTokenDTO from '../dto/userDTO.js'

class UserController {

async register(req, res) {
    let { first_name, last_name, email, password, ...resto } = req.body
    const newUser = req.user
    if(!first_name || !last_name || !email || !password) return res.status(400).send({status: 'error', message: 'deben venir todos los campos requeridos'})
    try {
        
        console.log("Usuario creado:", newUser)

        // Generar token
        const token = generateToken(newUser)

        // Guardar cookie firmada
        res.cookie('cookieToken', token, {
            httpOnly: true,
            signed: true,
            maxAge: 24 * 60 * 60 * 1000,
        })

        // Responder con el usuario
        res.status(201).json({
            message: 'Usuario registrado',
            user:newUser
            // user: {
            //     id: newUser._id,
            //     email: newUser.email,
            //     role: newUser.role,
            //     first_name: newUser.first_name,
            //     last_name: newUser.last_name,
            //     cartID: newUser.cartID._id,
            //     ...newUser
            // }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
  
    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await userService.loginUser(email, password)
            // delete user.password
            // delete user.atCreated
            console.log(`User: ${JSON.stringify(user, null, 2)}`)
            //ANTES DE DTO

            const payload = {
                _id: user._id,
                email: user.email,
                first_name: user.first_name,
                role: user.role,
                cartID: user.cartID
            }
            let payloadDTO = userTokenDTO(user)

            console.log(`DTO: ${JSON.stringify(payloadDTO, null, 2)}`)

            const token = generateToken(payload)

            res.cookie('cookieToken', token, {
                httpOnly: true,
                signed: true,
                maxAge: 24 * 60 * 60 * 1000,
            })
            // res.status(201).json({ message: 'Login exitoso', user :{
            //     email:user.email,
            //     Nombre:user.first_name,
            //     Rol:user.role
            // }})
            // console.log({user})
            // res.status(201).json({message: `Bienvenid@ ${user.first_name}`,user,payloadDTO})
            //La idea es enviar el dto para que sea mostrado en el frontend de una manera mas estetica.
            
            res.status(201).json({ message: `Bienvenid@ ${user.first_name}`, payloadDTO })

        } catch (error) {
            res.status(401).json({ error: error.message })
        }
    }

    // async genDto(req,res){
    //     try {

    //         let user = req.user()
    //         let userDTO = userTokenDTO(user)
    //     } catch (error) {

    //     }
    // }
    async getProfile(req, res) {
        try {
            const user = await userService.getUserProfile(req.params.id)

            //BORRAR ANTES DE ENTREGA 
            res.status(200).json(user)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }
    async current(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Usuario no autenticado' })
            }

            const DTOuser = new userTokenDTO(req.user)

            return res.status(200).json({
                message: `Bienvenido/a ${DTOuser.name}.`,
                DTOuser
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: error.message })
        }
    }

    async updateProfile(req, res) {
        try {
            const updatedUser = await userService.updateUserProfile(req.params.id, req.body)
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const user = await userService.getUserProfile(req.params.id)
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' })
            }

            const deletedUser = await userService.deleteUser(id)
            res.status(200).json({ message: 'Usuario eliminado correctamente', user: deletedUser })


        } catch (error) {

        }
    }
    async logout(req, res) {
    try {
        res.clearCookie('cookieToken', {
            httpOnly: true,
            signed: true,
            sameSite: 'strict'
        });

        res.status(200).json({ message: 'Logout exitoso' });
    } catch (error) {
        res.status(500).json({ error: 'Error al cerrar sesión' });
    }
}
}

export default new UserController()

