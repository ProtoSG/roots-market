import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

interface Props {
  icon: ReactNode
  name: string
  url: string
}
export function ItemLink({icon, name, url}: Props){
  const location = useLocation()
  const isSelected = location.pathname === url

  return(
    <Link 
      to={url}
      className={`
      flex gap-4 rounded-lg px-4 py-2 cursor-pointer  transition-colors
      ${isSelected ? "bg-white text-black" : "text-white hover:bg-white/80 hover:text-black"}
    `}
    >
      {icon}
      {name}
    </Link>
  )
}
