import type { Request, Response } from "express";
import { createCategory, foundCategoryByName, readCategories } from "../services/category.service";
import type { Category } from "../models/category.model";

export const registerCategory = async (req: Request, res: Response) => {
  try {
    const {name} = req.body

    const categoryFound = await foundCategoryByName(name)
    if (categoryFound) {
      return res.status(400).json({
        message: "La categoría ya existe",
      });
    }
  
    const category: Category = {
      name,
    }

    const newCategory = await createCategory(category)

    res.status(201).json({
      id: newCategory.categoryId,
      message: newCategory.message,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al crear la Categoría" });
  }
}

export const getCategories = async(_: Response, res:Response) => {
  try {
    const categories = await readCategories()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las categorias" });
  }
}
