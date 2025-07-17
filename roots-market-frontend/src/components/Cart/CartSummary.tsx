import { useState } from "react"
import { useShoppingCartStore } from "../../stores/shoppingCartStore"
import { PrimaryButton } from "../UI"
import { DialogContainer } from "../UI/DialogContainer"
import { useDialog } from "../../hooks/useDialog"
import { CheckoutForm } from "./Checkout/CheckoutForm"

export function CartSummary() {
  const { count, total } = useShoppingCartStore()
  const [open, setOpen] = useState(false)
  const dialogRef = useDialog(open)

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
        onClick={() => setOpen(true)}
        disabled={count === 0}
        className="disabled:bg-zinc-400 disabled:cursor-not-allowed disabled:border-zinc-400"
      >
        Continuar compra
      </PrimaryButton>
      {open && (
        <DialogContainer dialogRef={dialogRef} setOpen={setOpen}>
          <CheckoutForm onClose={() => setOpen(false)} />
        </DialogContainer>
      )}
    </div>
  )
}
