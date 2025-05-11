import { RefObject, useEffect } from "react";
import { useShoppingCartStore } from "../../stores/shoppingCartStore";
import { PrimaryButton } from "./Button";
import { UnderlineText } from "./UnderlineText";

interface Props{
  isOpen: boolean 
  setIsOpen: (isOpen: boolean) => void
  cartRef: RefObject<HTMLDivElement | null>
}

export function ShoppingCart({isOpen, setIsOpen, cartRef}: Props) {
  const { items, total, clear } = useShoppingCartStore()
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if(cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(!isOpen)
      }
    }

    if (isOpen){
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [cartRef, isOpen, setIsOpen])

  return(
    <div 
      ref={cartRef} 
      className="absolute overflow-hidden sm:right-16 top-16 flex flex-col gap-2 min-w-80 h-[400px] max-h-[400px] px-6 py-4 rounded-lg animate-expand drop-shadow-2xl bg-white"
    >
      <div className="flex justify-between">
        <p className="font-semibold">Productos</p>
        <UnderlineText 
          onClick={clear}
        >
          Limpiar
        </UnderlineText>
      </div>
      <hr />
      <section className="flex flex-col  gap-3 flex-1 overflow-y-scroll">
        {items.map((item) => (
          <div 
            key={item.product.id}
            className="flex items-center gap-4"
          >
            <p className="w-36">{item.product.name}</p>
            <p className="w-8 text-center">{item.quantity}</p>
            <p className="text-nowrap">S/ {item.subTotal.toFixed(2)}</p>
          </div>
        ))}
      </section>
      <hr />
      <div className="flex justify-between font-semibold">
        <p className="">Total:</p>
        <span>S/ {total.toFixed(2)}</span>
      </div>
      <PrimaryButton
        onClick={() => {}}
        className="w-full"
      >
        Ver Carrito
      </PrimaryButton>
    </div>
  )
}
