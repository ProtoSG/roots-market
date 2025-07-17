import { useNavigate } from "react-router-dom";
import { uselogginDialogStore } from "../../stores/dialogStore";
import { useAuth } from "../../hooks/useAuth";

export function LoginButton() {
  const { setOpen } = uselogginDialogStore()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleOpenOrNavigate = () => {
    console.log("isAuthenticated", isAuthenticated)
    if (isAuthenticated) navigate("/artisan/")
    else setOpen(true)
  }

  const textLoggin = isAuthenticated ? 'Mi perfil' : 'Iniciar Sesión'

  return(
    <div
      onClick={handleOpenOrNavigate} 
      className="hover:underline hover:text-primary transition-all cursor-pointer"
    >
      <span>{textLoggin}</span>
     </div> 
  )
}