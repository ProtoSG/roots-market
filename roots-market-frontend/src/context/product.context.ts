import { createContext } from "react";
import { Product, ProductFilter } from "../models/product.model";

export interface ProductContextType {
  products: ProductFilter
  productsRanking: Product[]
  productsRankingByArtisan: Product[] 
  // errors: string[]
  // loading: boolean
}

export const ProductContext = createContext<ProductContextType | null>(null)
