import { toast } from "sonner";
import { MinusIcon, PlusIcon } from "../../icons";
import { Product } from "../../models/product.model";
import { useQuantityStore } from "../../stores/quantityStore";
import { useShoppingCartStore } from "../../stores/shoppingCartStore";
import { PrimaryButton } from "./Button";
import { useDialogStore } from "../../stores/dialogStore";

interface Props{
  product: Product
}

export function QuantitySelector({product}: Props){
  const { quantity, increment, decrement } = useQuantityStore()
  const { setOpen } = useDialogStore()
  const { addItem } = useShoppingCartStore()

  const handleAddItem = () => {
    const subTotal = quantity * product.price
    
    addItem({
      product,
      quantity,
      subTotal
    })

    setOpen(false)

    toast.success(`${product.name} se agregó al carrito de compras`)
  }

  return(
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12">
      <div className="flex gap-5 items-center">
        <span
          onClick={decrement}
          className={`
            rounded p-1 transition-colors hover:bg-primary hover:text-white
            ${quantity === 1 ? "cursor-not-allowed hover:bg-zinc-500" : "cursor-pointer"}
          `}
        >
          <MinusIcon />
        </span>
        <span className="flex justify-center w-4">{quantity}</span>
        <span
          onClick={increment}
          className="rounded p-1 transition-colors hover:cursor-pointer hover:bg-primary hover:text-white"
        >
          <PlusIcon />
        </span>
      </div>
      <PrimaryButton onClick={handleAddItem}>
        Agregar al carrito
      </PrimaryButton>
    </div>
  )
}
