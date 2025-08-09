// src/services/product.service.js
// import { ProductDAO } from '../dao/productDAO.js'
import productRepository from "../repository/productRepository.js"
//const productDAO = new productRepository()

export class ProductService {

    async getAllProducts(queryParams) {
        const {
            limit = 10,
            page = 1,
            sort,
            category,
        } = queryParams

        const filter = category ? { category } : {}

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort === 'asc' ? { price: 1 } :
                  sort === 'desc' ? { price: -1 } :
                  undefined
        }

        return await productRepository.getAllPaginated(filter, options)
    }

    async getProductByID(id) {
        const product = await productRepository.getProductById(id)
        if (!product) throw new Error("Producto no encontrado")
        return product
    }

    async createProduct(data) {
        // Validaciones extra si se necesita
        return await productRepository.create(data)
    }

    async updateProduct(id, data) {
        const updatedProduct = await productRepository.update(id, data)
        if (!updatedProduct) throw new Error("Producto no encontrado")
        return updatedProduct
    }

    async deleteProduct(id) {
        const deleted = await productRepository.delete(id)
        if (!deleted) throw new Error("Producto no encontrado")
        return deleted
    }
}
