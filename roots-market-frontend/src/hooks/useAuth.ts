import { useContext } from "react"
import { AuthContext } from "../context/aut.context"

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within a AuthProvider")
  return context 
}
