import { ShoppingIcon } from "../../icons";
import { useShoppingCartStore } from "../../stores/shoppingCartStore";

interface Props{
  setIsOpen: (isOpen: boolean) => void
}

export function ShoppingButton({ setIsOpen }: Props){
  const { count } = useShoppingCartStore()

  const handleOpen = () => {
    setIsOpen(true)
  }

  return(
    <div 
      onClick={handleOpen}
      className="relative hover:cursor-pointer group"
    >
      <ShoppingIcon className="size-8 group-hover:text-primary transition-colors"/>
      <div
        className="absolute -right-1 -bottom-1 flex items-center justify-center size-5 rounded-full bg-primary"
      >
        <small
          className="text-white"
        >{count}</small>
      </div>
    </div>
  )
}
