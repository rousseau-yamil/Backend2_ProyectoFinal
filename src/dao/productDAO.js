// src/dao/managers/product.dao.js
import ProductModel from './models/productModel.js'

class ProductDAO {
    async getAll(query) {
        return await ProductModel.find(query)
    }

    async getById(id) {
        return await ProductModel.findById(id)
    }

    async create(data) {
        return await ProductModel.create(data)
    }

    async update(id, data) {
        return await ProductModel.findByIdAndUpdate(id, data, { new: true })
    }

    async delete(id) {
        return await ProductModel.findByIdAndDelete(id)
    }

    async getAllPaginated(query, options) {
    return await ProductModel.paginate(query, options)
}
}

export default new ProductDAO()
