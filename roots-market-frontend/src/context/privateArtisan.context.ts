import { createContext } from "react"
import { Artisan } from "../models/artisan.model"

export interface PrivateArtisanContextType {
  artisanInfo: Artisan
}

export const PrivateArtisanContext = createContext<PrivateArtisanContextType | null>(null)
