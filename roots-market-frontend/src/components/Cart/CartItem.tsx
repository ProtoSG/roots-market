import { XIcon } from "../../icons"
import { ItemState, useShoppingCartStore } from "../../stores/shoppingCartStore"
import { QuantitySelector } from "../UI"

interface Props {
  item: ItemState
}

export function CartItem({item}: Props) {
  const { incrementQuantity, decrementQuantity, removeItem } = useShoppingCartStore()

  return (
    <div
      className="flex justify-between gap-4 items-center"
    >
      <div className="flex gap-4 items-center">
      <img 
        src={item.product.images[0]}
        alt={item.product.name}
        className="w-32 h-40 object-cover rounded-lg"
      />
      <div>
        <p className="text-xl">{item.product.name}</p>
        <p className="text-nowrap">
          <span className="font-semibold">Precio: </span> 
          <span >S/ {item.product.price.toFixed(2)}</span>
        </p>
      </div>
    </div>
      <div className="flex flex-1 flex-col sm:flex-row items-center justify-around gap-4">
        <QuantitySelector
          quantity={item.quantity}
          decrement={() => decrementQuantity(item)}
          increment={() => incrementQuantity(item)}
        />
        <span className="text-lg font-semibold text-nowrap">
          S/ {item.subTotal.toFixed(2)}
        </span>
      </div>
      <span 
        onClick={() => removeItem(item.product.id)}
        className="transition-all cursor-pointer hover:text-primary hover:scale-125"
      >
        <XIcon />
      </span>
    </div>
  )
}
