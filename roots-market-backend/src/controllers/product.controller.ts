import type { Request, Response } from "express"
import { type ProductCreate, type ProductFilter, type ProductUpdate } from "../models/product.model"
import { createProduct, deleteProduct, readProducts, readProductsByArtisan, readRankingProduct, readRankingProductByArtisan, updateProduct } from "../services/product.service"

export const registerProduct = async(req: Request, res: Response ) => {
  try {
    const { 
      name, 
      story,
      price,
      stock,
      categoryId,
      images,
      tags,
    } = req.body

    const artisanId = req.user.id

    const newProduct: ProductCreate = {
      name,
      story,
      price,
      stock,
      categoryId,
      images,
      tags,
    }

    const productCreated = await createProduct(newProduct, artisanId)

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

export const putProduct = async(req: Request, res: Response) => {
  try {
    const artisanId = req.user.id
    const productId = Number(req.params.id)
    if(Number.isNaN(productId)){
      return res.status(500).json({
        message: "ID inválido"
      })
    }

    const {
      name, 
      story,
      price,
      stock,
      categoryId,
      images,
      imagesIdDelete,
      tags,
      tagsIdDelete
    } = req.body
  
    const newPrdocut: ProductUpdate = {
      name, 
      story,
      price,
      stock,
      categoryId,
      images,
      imagesIdDelete,
      tags,
      tagsIdDelete
    }

    const idProductUpdate = await updateProduct(productId, artisanId, newPrdocut)
    
    res.json({
      id: idProductUpdate,
      message: `El producto con ID ${idProductUpdate} se actualizó correctamente`
    })
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el Producto"
    })
  }
}

export const removeProduct = async(req: Request, res: Response) => {
  try {
    const artisanId = req.user.id 
    const productId = Number(req.params.id);
    if (Number.isNaN(productId)) return res
        .status(400)
        .json({ message: "ID de producto inválido" });

    const id = await deleteProduct(productId, artisanId)

    if(!id) return res
        .status(404)
        .json({ message: `Producto con ID ${productId} no existe` })

    return res.status(200).json({
      id,
      message: `Producto con ID ${id} se eliminó correctamente`
    })
} catch (error) {
    console.error("Error en removeProduct:", error);
    return res
      .status(500)
      .json({ message: "Error en el servicio al eliminar el producto" });
  }
}

export const getProductsByArtisan = async(req: Request, res: Response) => {
  try {
    const artisanId = req.user.id
    const page = Number(req.query.page) || 1 
    const limit = Number(req.query.limit) || 10

    const products = await readProductsByArtisan(artisanId, page, limit)
    if(!products){
      return res.status(404).json({
        message: `Productos del artesano con ID ${artisanId} no encontrado`
      })
    }

    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los Productos"
    })
  }
} 

export const getProducts = async(req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 9
    const categoryId = Number(req.query.categoryId) || null
    const artisanId = Number(req.query.artisanId) || null
    const minPrice = Number(req.query.minPrice) || null
    const maxPrice = Number(req.query.maxPrice) || null

    const rangePrice: [number | null, number | null] = [minPrice, maxPrice]
    const filters: ProductFilter = {
      categoryId,
      artisanId,
      rangePrice
    }

    const products = await readProducts(page, limit, filters)
    
    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los Productos"
    })
  }
}

// export const getProductById = async(req: Request, res: Response) => {
//   try {
//     const productId = parseInt(req.params.id as string)
//     if(isNaN(productId)){
//       return res.status(500).json({
//         message: "ID inválido"
//       })
//     }
//
//     const product = await readProductById(productId)
//     if(!product){
//       return res.status(404).json({
//         message: `Producto con ID ${productId} no encontrado`
//       })
//     }
//
//     res.json(product)
//   } catch (error) {
//     res.status(500).json({
//       message: "Error al obtener el Producto"
//     })
//   }
// }


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

export const getRankingProductsByArtisan = async(req: Request, res: Response) => {
  try {
    const id =  parseInt(req.params.id as string)
    const products = await readRankingProductByArtisan(id)
    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los Productos"
    })
  }
}
