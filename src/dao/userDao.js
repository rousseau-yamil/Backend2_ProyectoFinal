// src/dao/user.dao.js
import userModel from './models/userModel.js'

class UserDAO {
    async create(userData) {
        return await userModel.create(userData)
    }

    async findByEmail(email) {
        return await userModel.findOne({ email }).lean()
    }

    async findById(id) {
        return await userModel.findById(id).lean()
    }

    async update(id, updateData) {
        return await userModel.findByIdAndUpdate(id, updateData, { new: true })
    }

    async delete(id) {
        return await userModel.findByIdAndDelete(id)
    }

    async getAllUsers() {
        return await userModel.find().lean()
    }
    async findAll() {
        return await userModel.find().lean()
    }
}

export default new UserDAO()
