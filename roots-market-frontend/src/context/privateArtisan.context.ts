import { createContext } from "react"
import { Artisan } from "../models/artisan.model"
import { ProductFilter } from "../models/product.model"

export interface PrivateArtisanContextType {
  artisanInfo: Artisan
  invalidateArtisanInfo: () => void

  products: ProductFilter
}

export const PrivateArtisanContext = createContext<PrivateArtisanContextType | null>(null)
