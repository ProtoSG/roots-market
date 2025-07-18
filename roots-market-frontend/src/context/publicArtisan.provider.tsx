import { ReactNode } from "react"
import { PublicArtisanContext } from "./publicArtisan.context"
import { useQuery } from "../hooks/useQuery"
import { getArtisans, getLastArtisan } from "../api/artisans"
import { ArtisanLast, ArtisanPagination } from "../models/artisan.model"
import { FilterArtisansStore } from "../stores/filterArtisansStore"

export const PublicArtisanProvider = ({children}: {children: ReactNode}) => {
  const {page} = FilterArtisansStore()

  const {data: artisanLast} = useQuery<ArtisanLast>({
    fn: getLastArtisan,
    key: 'artisan-last'
  })


  const key = JSON.stringify({
    resource: "artisans",
    page
  })

  const {data: artisans} = useQuery<ArtisanPagination>({
    fn: () => getArtisans({
      page,
    }),
    key
  })

  return (
    <PublicArtisanContext.Provider
      value={{
        artisanLast,
        artisans,
      }}
    >
      {children}
    </PublicArtisanContext.Provider>
  )
}
