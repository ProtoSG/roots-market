import { Link, useLocation } from "react-router-dom";

interface Props {
  name: string 
  path: string
}

export function LinkItem({name, path}: Props) {

  const location = useLocation()
  const isActive = location.pathname === path 

  return(
    <li>
      <Link
        to={path}
        className={`
          border-b transition-all ${isActive ? 'text-primary border-primary' : 'border-transparent' }
          hover:text-primary
        `}
      >
        {name}
      </Link>
    </li>
  )
}
