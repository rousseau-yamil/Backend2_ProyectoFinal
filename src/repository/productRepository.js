import productDAO  from "../dao/productDAO.js"


class ProductRepository {
  async create(productData) {
    return await productDAO.create(productData)
  }
  async update(id, updateData) {
    return await productDAO.update(id, updateData)
  }

  async delete(id) {
    return await productDAO.delete(id)
  }

  async getProductById(id) {
    return await productDAO.getById(id)
  }

  async getAll(query){
    return await productDAO.getAllPaginated(query.filter, query.options)
  }
   async getAllPaginated(query){
    return await productDAO.getAllPaginated(query.filter, query.options)
  }
  async getAllProducts(filter = {}) {
    return await productDAO.findAll(filter)
  }

}

export default new ProductRepository()
