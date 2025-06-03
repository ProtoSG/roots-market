import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { UserIcon } from "../../icons";
import { uselogginDialogStore } from "../../stores/dialogStore";

export function LoginButton() {
  const { setOpen } = uselogginDialogStore()
  const {isAuthenticated} = useAuth()
  const navigate = useNavigate()

  const handleOpenOrNavigate = () => {
    if (isAuthenticated) navigate("/artisan")
    else setOpen(true)
  }

  return(
    <div 
      onClick={handleOpenOrNavigate}
      className="relative hover:cursor-pointer group transition-colors border-2 border-primary hover:bg-primary rounded-full p-2"
    >
      <UserIcon className="text-primary  group-hover:text-white transition-colors"/>
    </div>
  )
}
