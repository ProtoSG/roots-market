import { Category, CategoryResponse } from "../models/category.model";

export const categoryAdapter = (category: CategoryResponse): Category => ({   
  id: category.categoryId,
  name: category.name
})
