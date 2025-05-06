import type { Request, Response } from "express"
import { Product } from "../models/product.model"
import { createProduct, readProductById, readProducts, readRankingProduct, updateProductById } from "../services/product.service"

export const registerProduct = async(req: Request, res: Response ) => {
  try {
    const { 
      name, 
      story,
      price,
      stock,
      artisanId,
      categoryId 
    } = req.body

    const newProduct = new Product(
      name, 
      story,
      price,
      stock,
      artisanId,
      categoryId 
    )

    const productCreated = await createProduct(newProduct)

    res.json({
      id: productCreated.productId,
      message: productCreated.message
    })
  } catch (error) {
    res.status(500).json({
      message: "Error al registrar el Producto"
    })
  }
}

export const getProducts = async(_: Request, res: Response) => {
  try {
    const products = await readProducts()
    
    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los Productos"
    })
  }
}

export const getProductById = async(req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id as string)
    if(isNaN(productId)){
      return res.status(500).json({
        message: "ID inválido"
      })
    }

    const product = await readProductById(productId)
    if(!product){
      return res.status(404).json({
        message: `Producto con ID ${productId} no encontrado`
      })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el Producto"
    })
  }
}

export const getRankingProducts = async(_: Request, res: Response) => {
  try {
    const products = await readRankingProduct()

    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los Productos"
    })
  }
}

export const putProductById = async(req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id as string)
    if(isNaN(productId)){
      return res.status(500).json({
        message: "ID inválido"
      })
    }

    const {
      name, 
      story,
      price,
      stock,
      artisanId,
      categoryId,
      createdAt,
    } = req.body
  
    const newPrdocut = new Product(
      name, 
      story,
      price,
      stock,
      artisanId,
      categoryId,
      createdAt
    )

    const prodcutUpdated = await updateProductById(productId, newPrdocut)
    
    res.json({
      message: prodcutUpdated.message
    })
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el Producto"
    })
  }
}
