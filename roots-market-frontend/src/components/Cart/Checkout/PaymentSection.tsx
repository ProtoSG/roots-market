interface Props {
  form: any
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export function PaymentSection({ form, onChange }: Props) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-semibold mb-1">Método de pago</legend>
      <div className="flex flex-col gap-2">
        <label htmlFor="payment" className="text-sm">Selecciona un método</label>
        <select
          id="payment"
          name="payment"
          value={form.payment}
          onChange={onChange}
          required
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="card">Tarjeta</option>
          <option value="yape">Yape/Plin</option>
          <option value="cash">Efectivo</option>
        </select>
      </div>
    </fieldset>
  )
} 