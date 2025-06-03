import { useShoppingCartStore } from "../../stores/shoppingCartStore"
import { CartItem } from "./CartItem"

export function CartList() {
  const { items } = useShoppingCartStore()

  return (
    <article className="flex flex-1 flex-col gap-4 p-4 rounded-lg bg-white">
      {items.map((item) => (
        <CartItem key={item.product.id} item={item} />
      ))}
    </article>
  )
}
