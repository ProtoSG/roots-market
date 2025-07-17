import { PersonalInfoSection } from "./PersonalInfoSection"
import { ShippingSection } from "./ShippingSection"
import { PaymentSection } from "./PaymentSection"
import { useState } from "react"
import { useShoppingCartStore } from "../../../stores/shoppingCartStore"

interface Props {
  onClose: () => void
}

export function CheckoutForm({ onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    reference: "",
    payment: "card",
    comments: ""
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const clearCart = useShoppingCartStore(s => s.clear)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      clearCart()
      setTimeout(() => {
        onClose()
      }, 1200)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <PersonalInfoSection form={form} onChange={handleChange} />
      <ShippingSection form={form} onChange={handleChange} />
      <PaymentSection form={form} onChange={handleChange} />
      <div className="flex flex-col gap-2">
        <label htmlFor="comments" className="text-sm font-medium">Comentarios (opcional)</label>
        <textarea
          id="comments"
          name="comments"
          value={form.comments}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm"
          rows={2}
        />
      </div>
      {!submitted && (
        <button type="submit" className="bg-primary text-white rounded px-4 py-2 font-semibold hover:bg-primary/90 transition" disabled={loading}>
          {loading ? "Procesando..." : "Confirmar compra"}
        </button>
      )}
      {loading && (
        <div className="text-center text-primary font-semibold">Procesando compra...</div>
      )}
      {submitted && (
        <div className="flex flex-col items-center gap-1 mt-2">
          <div className="text-green-600 text-center font-semibold">¡Compra realizada correctamente!</div>
          <div className="text-xs text-gray-400 text-center">Esta es una simulación de compra</div>
        </div>
      )}
    </form>
  )
} 