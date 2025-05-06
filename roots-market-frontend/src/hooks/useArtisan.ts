import { artisanAdapter } from "../adapters/artisan.adapter"
import { ArtisanTestimony, ArtisanTestimonyResponse } from "../models/artisan.model"
import { fetchData } from "../utils/fetchData"
import { useQuery } from "./useQuery"

export const useLastArtisan = () => {
  const data = useQuery({
    fn: () => fetchData<ArtisanTestimony, ArtisanTestimonyResponse>({
      url: 'artisan/last',
      jsonAdapter: artisanAdapter
    }),
    key: 'artisanLast'
  })

  return data[0]
}
