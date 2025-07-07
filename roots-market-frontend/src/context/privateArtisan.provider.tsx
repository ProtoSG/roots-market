import { ReactNode } from "react"
import { getArtisanInfo, getProductsArtisan } from "../api/artisans"
import { useQuery } from "../hooks/useQuery"
import { PrivateArtisanContext } from "./privateArtisan.context"
import { useAuth } from "../hooks/useAuth"
import { ProductFilter } from "../models/product.model"

export const PrivateArtisanProvider = ({children}: {children: ReactNode}) => {
  const { user } = useAuth()
 
  const {data: artisanInfo, invalidate: invalidateArtisanInfo } = useQuery({
    fn: getArtisanInfo,
    key: user ? `artisan-info-${user.id}` : 'artisan-info-anonymous',
  })

  const { data: products } = useQuery<ProductFilter>({
    fn: getProductsArtisan,
    key: 'artisans-products'
  })
    
  return (
    <PrivateArtisanContext.Provider
      value={{
        artisanInfo,
        invalidateArtisanInfo,
        products
      }}
    >
      {children}
    </PrivateArtisanContext.Provider>
  )
}
