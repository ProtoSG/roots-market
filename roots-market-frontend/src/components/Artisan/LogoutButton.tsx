import { useAuth } from "../../context/auth.context";
import { LogoutIcon } from "../../icons";

export function LogoutButton() {
  const {logout} = useAuth()

  return (
    <button
      onClick={logout} 
      className="
        flex gap-4 w-full rounded-lg px-4 py-2 cursor-pointer  transition-colors
        hover:bg-white/80 hover:text-black
      "
    >
      <LogoutIcon />
      Salir
    </button>
  )
}
