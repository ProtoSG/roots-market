import { useShoppingCartStore } from "../../stores/shoppingCartStore"

export function CartHeader() {
  const { count } = useShoppingCartStore()

  return (
    <header>
      <h4 className="text-2xl">Carro</h4>
      <span className="text-zinc-500">( {count} producto(s) )</span>
    </header>
  )
}
