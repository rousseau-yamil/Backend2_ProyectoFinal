// src/controllers/product.controller.js
import { ProductService } from '../services/product.service.js'

const productService = new ProductService()

export const getAllProducts = async (req, res) => {
    try {
        const result = await productService.getAllProducts(req.query)
        res.status(200).send({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

export const getProductByID = async (req, res) => {
    try {
        const result = await productService.getProductByID(req.params.pid)
        res.status(200).send({ status: 'success', payload: result })
    } catch (error) {
        res.status(404).send({ status: 'error', message: error.message })
    }
}

export const createProduct = async (req, res) => {
    try {
        if (req.files) {
            req.body.thumbnails = req.files.map(file => file.path)
        }

        const result = await productService.createProduct(req.body)
        res.status(201).send({ status: 'success', payload: result })
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        if (req.files) {
            req.body.thumbnails = req.files.map(file => file.filename)
        }

        const result = await productService.updateProduct(req.params.pid, req.body)
        res.status(200).send({ status: 'success', payload: result })
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid

        const result = await productService.deleteProduct(pid)
        if (!result) {
            res.status(404).send({status:'error',message:'Producto no encontrado'})
        }
        res.status(200).send({ status: 'success', message:'Producto eliminado correctamente',payload: result })
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}
