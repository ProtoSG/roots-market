import { useContext } from "react"
import { PublicArtisanContext } from "../context/publicArtisan.context"
import { PrivateArtisanContext } from "../context/privateArtisan.context"

export const useArtisanPublic = () => {
  const context = useContext(PublicArtisanContext)
  if (!context) throw new Error("useArtisanPublic debe usarse dentro de PublicArtisanProvider")
  return context
}

export const useArtisanPrivate = () => {
  const context = useContext(PrivateArtisanContext)
  if (!context) throw new Error("useArtisanPrivate debe usarse dentro de PrivateArtisanProvider")
  return context
}
