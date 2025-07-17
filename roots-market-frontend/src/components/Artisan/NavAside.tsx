import { ItemLink, LogoutButton } from "."
import { BoxIcon, UserIcon } from "../../icons"

const LINKS = [
  {
    icon: <UserIcon />,
    name: "Info",
    url: "/artisan/"
  },
  {
    icon: <BoxIcon />,
    name: "Productos",
    url: "/artisan/products"
  }
]

export function NavAside(){
  return(
    <aside className="flex flex-col gap-8 bg-primary rounded-lg text-white p-4">
      <nav className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-4">
          {LINKS.map((link) => (
            <ItemLink
              key={link.url}
              icon={link.icon}
              name={link.name}
              url={link.url}
            />
          ))}
        </ul>
        <LogoutButton />
      </nav>
    </aside>
  )
}
