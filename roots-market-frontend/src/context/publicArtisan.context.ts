import { createContext } from "react";
import { ArtisanLast, ArtisanPagination } from "../models/artisan.model";

export interface PublicArtisanContextType {
  artisanLast: ArtisanLast
  artisans: ArtisanPagination
}

export const PublicArtisanContext = createContext<PublicArtisanContextType | null>(null)
