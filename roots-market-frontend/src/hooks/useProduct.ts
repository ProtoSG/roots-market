import { useContext } from "react"
import { ProductContext } from "../context/product.context"

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) throw new Error("useProduct debe usarse dentro de ProductProvider")
  return context
}
