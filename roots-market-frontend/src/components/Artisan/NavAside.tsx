import { ItemLink, LogoutButton } from "."
import { useAuth } from "../../context/auth.context"
import { BoxIcon, UserIcon } from "../../icons"

const LINKS = [
  {
    icon: <UserIcon />,
    name: "Info",
    url: "/artisan"
  },
  {
    icon: <BoxIcon />,
    name: "Productos",
    url: "/artisan/products"
  }
]

export function NavAside(){
  const {user} = useAuth()

  return(
    <aside className="flex flex-col gap-8 min-w-24 bg-primary rounded-lg text-white p-4">
      <div className="flex flex-col items-center gap-2 mt-6">
        <img 
          src="https://guruexplorers.sfo3.digitaloceanspaces.com/uploads/Iz07MP0UNgTuyHeAexcEZKe5c8vxa65wiJ8OPE62.jpg"
          className="size-32 rounded-full bg-white object-cover"
        />
        <p className="font-semibold">{user?.username}</p>
      </div>
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
