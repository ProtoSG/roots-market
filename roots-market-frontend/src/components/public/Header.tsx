import { Link } from "react-router-dom"

export function Header() {
  return(
    <nav>
      <ul>
        <li>
          <Link
            onClickO={onClick}
            to={link}
          />
        </li>
      </ul>
    </nav>
  )
}
