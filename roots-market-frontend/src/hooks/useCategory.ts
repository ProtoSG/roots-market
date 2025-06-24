import { useContext } from "react"
import { CategoryContext } from "../context/category.context"

export const useCategory = () => {
  const context = useContext(CategoryContext)
  if (!context) throw new Error("useCategory debe usarse dentro de CategoryProvider")
  return context
}
