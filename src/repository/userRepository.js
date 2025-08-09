// src/repositories/user.repository.js
import userDAO from '../dao/userDao.js'

class UserRepository {
  async createUser(userData) {
    return await userDAO.create(userData)
  }

  async getUserByEmail(email) {
    return await userDAO.findByEmail(email)
  }

  async getUserById(id) {
    return await userDAO.findById(id)
  }

  async updateUser(id, updateData) {
    return await userDAO.update(id, updateData)
  }

  async deleteUser(id) {
    return await userDAO.delete(id)
  }

  async getAllUsers() {
    return await userDAO.findAll()
  }
}

export default new UserRepository()
