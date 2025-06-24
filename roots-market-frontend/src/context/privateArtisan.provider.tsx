import { ReactNode } from "react"
import { getArtisanInfo } from "../api/artisans"
import { useQuery } from "../hooks/useQuery"
import { PrivateArtisanContext } from "./privateArtisan.context"

export const PrivateArtisanProvider = ({children}: {children: ReactNode}) => {
  const artisanInfo = useQuery({
    fn: getArtisanInfo,
    key: 'artisan-info',
  })

  return (
    <PrivateArtisanContext.Provider
      value={{
        artisanInfo
      }}
    >
      {children}
    </PrivateArtisanContext.Provider>
  )
}
