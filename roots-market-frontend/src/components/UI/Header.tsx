import { useEffect, useRef, useState } from "react"
import { LinkItem } from "./LinkItem"
import { ShoppingButton } from "./ShoppingButton"
import { ShoppingCart } from "./ShoppingCart"

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
  const [isOpen, setIsOpen] = useState(false)
  const cartRef = useRef<HTMLDivElement>(null)

  return(
    <header className="flex mx-auto justify-center items-center">
      <section className="flex fixed top-0 w-full max-w-5xl z-50 justify-between py-6 px-4 sm:px-16  backdrop-blur-lg">
        <nav>
          <ul className="flex gap-7">
            {navLinks.map(({name, path}) => (
              <LinkItem key={path} name={name} path={path} />
              ))}
          </ul>
        </nav>
        <ShoppingButton  setIsOpen={setIsOpen}/>
        {isOpen && 
          <ShoppingCart isOpen={isOpen} setIsOpen={setIsOpen} cartRef={cartRef} />
        }
      </section>
    </header>
  )
}
