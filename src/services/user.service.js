// src/services/user.service.js
// import userDAO from '../dao/userDao.js'
import userRepository from '../repository/userRepository.js'
import cartRepository from '../repository/cartRepository.js'

import bcrypt, { hash } from 'bcrypt'

class UserService {
    async registerUser(userData) {
        //validacion extra
        if (!userData.email || !userData.password) {
            throw new Error('Email y contraseña requeridos')
        }

        const existingUser = await userRepository.getUserByEmail(userData.email)
        if (existingUser) throw new Error('Email ya registrado')

        const cart = await cartRepository.createCart({ products: [] })


        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const newUser = {
            ...userData,
            password:hashedPassword,
            role: userData.role || 'user',
            cartID: userData.cartID || null,
            cartID: cart._id,
        }
        //userData.password = hashedPassword
        return await userRepository.createUser(newUser)
    }

    async loginUser(email, password) {
        const user = await userRepository.getUserByEmail(email)
        // if (!user) throw new Error('Usuario no encontrado')

        // const isMatch = await bcrypt.compare(password, user.password)
        // if (!isMatch) throw new Error('Contraseña incorrecta')
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Credenciales inválidas')
        }
        return user
    }

    async getUserProfile(id) {
        return await userRepository.getUserById(id)
    }

    async updateUserProfile(id, updateData) {
        return await userRepository.updateUser(id, updateData)
    }

    async deleteUser(id) {
        return await userRepository.deleteUser(id)
    }

    async listUsers() {
        return await userRepository.getAllUsers()
    }

}

export default new UserService()
