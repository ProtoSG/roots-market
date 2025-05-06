import { Link } from "react-router-dom"
import { ShoppingIcon } from "../../icons"
import { LinkItem } from "./LinkItem"

interface LinkItem {
  name: string
  path: string
}

const navLinks: LinkItem[] = [
  {
    name: "Inicio",
    path: "/"
  },
  {
    name: "Productos",
    path: "/products"
  },
  {
    name: "Artesanos",
    path: "/artisans"
  },
]

export function Header() {
  return(
    <header className="flex justify-between pt-6 pb-12">
      <nav>
        <ul className="flex gap-7">
          {navLinks.map(({name, path}) => (
            <LinkItem key={path} name={name} path={path} />
            ))}
        </ul>
      </nav>
      <div className="relative hover:cursor-pointer group">
        <ShoppingIcon className="size-8 group-hover:text-primary transition-colors"/>
        <div
          className="absolute -right-1 -bottom-1 flex items-center justify-center size-5 rounded-full bg-primary"
        >
          <small
            className="text-white"
          >1</small>
        </div>
      </div>
    </header>
  )
}
