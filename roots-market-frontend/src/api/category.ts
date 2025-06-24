import { categoryAdapter } from "../adapters/category.adapter";
import { Category, CategoryResponse } from "../models/category.model"
import { ResponseWritter } from "../models/response.model";
import { requestJSON } from "./requestJSON"

export const getCategory = async (): Promise<Category[]> => {
  const { status, data } = await requestJSON<CategoryResponse[]>("/category", {
    method: "GET"
  })

  if (status < 200 || status >= 300) {
    throw new Error(`Failed to fetch last artisan: ${status}`);
  }

  return (data ?? []).map(categoryAdapter)
}

export const createCategory = async (category: Category) => {
  const {status, data} = await requestJSON<ResponseWritter>("/category", {
    method: "POST",
    body: JSON.stringify(category),
  })

  if (status != 201) {
    throw new Error(`Failed to create category: ${status}`);
  }

  return data
}
