import { useShoppingCartStore } from "../../stores/shoppingCartStore"
import { PrimaryButton } from "../UI"

export function CartSummary() {
  const { count, total } = useShoppingCartStore()

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-auto">
      <div className="flex gap-8 items-center justify-between">
        <p className="text-nowrap">
          <span className="text-lg font-semibold">Productos: </span> 
          {count}
        </p>
        <span className="text-2xl lg:text-base font-semibold text-nowrap">S/ {total.toFixed(2)}</span>
      </div>
      <PrimaryButton
        onClick={() => {}}
      >
        Continuar compra
      </PrimaryButton>
    </div>
  )
}
