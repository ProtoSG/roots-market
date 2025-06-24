import { ReactNode } from "react"
import { getCategory } from "../api/category"
import { useQuery } from "../hooks/useQuery"
import { Category } from "../models/category.model"
import { CategoryContext } from "./category.context"

export const CategoryProvider = ({children}: {children: ReactNode}) => {
  const categories = useQuery<Category[]>({
    fn: () => getCategory(),
    key: 'categories'
  })

  return (
    <CategoryContext.Provider
      value={{
        categories
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
