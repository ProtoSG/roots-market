import { artisanAdapter, artisanTestimonyAdapter } from "../adapters/artisan.adapter"
import { Artisan, ArtisanResponse, ArtisanTestimony, ArtisanTestimonyResponse } from "../models/artisan.model"
import { fetchData } from "../utils/fetchData"
import { useQuery } from "./useQuery"

export const useLastArtisan = () => {
  const data = useQuery({
    fn: () => fetchData<ArtisanTestimony, ArtisanTestimonyResponse>({
      url: 'artisan/last',
      jsonAdapter: artisanTestimonyAdapter
    }),
    key: 'artisanLast'
  })

  return data[0]
}

export const useArtisans = () => {
  const artisans = useQuery({
    fn: () => fetchData<Artisan, ArtisanResponse>({
      url: 'artisan',
      jsonAdapter: artisanAdapter
    }),
    key: 'artisans'
  })

  return artisans
}
