import { categoryAdapter } from "../adapters/category.adapter"
import { Category, CategoryResponse } from "../models/category.model"
import { fetchData } from "../utils/fetchData"
import { useQuery } from "./useQuery"

export const useCategories = () => {
  const data = useQuery({ 
    fn: () => fetchData<Category, CategoryResponse>({
      url: "category",
      jsonAdapter: categoryAdapter
    }),
    key: "category"
  })

  return data
}
