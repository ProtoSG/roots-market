import { useEffect, useRef, useState } from "react"
import { LinkItem } from "./LinkItem"
import { ShoppingButton } from "./ShoppingButton"
import { ShoppingCart } from "./ShoppingCart"
import { LoginButton } from "./LogginButton"

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

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return(
    <header className="flex mx-auto justify-center px-16">
      <section className={`flex fixed top-4 rounded-full w-full max-w-[896px] z-50 justify-between items-center py-2 px-8 backdrop-blur-lg font-semibold
        ${hasScrolled ? 'bg-zinc-500/30 drop-shadow-xl/25' : '' }
      `}>
        <nav>
          <ul className="flex gap-7">
            {navLinks.map(({name, path}) => (
              <LinkItem key={path} name={name} path={path} />
              ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <LoginButton />
          <ShoppingButton  setIsOpen={setIsOpen}/>
          {isOpen && 
            <ShoppingCart isOpen={isOpen} setIsOpen={setIsOpen} cartRef={cartRef} />
          }
        </div>
      </section>
    </header>
  )
}
