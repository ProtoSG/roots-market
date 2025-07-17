interface Props {
  form: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ShippingSection({ form, onChange }: Props) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-semibold mb-1">Dirección de envío</legend>
      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="text-sm">Dirección</label>
        <input
          id="address"
          name="address"
          type="text"
          value={form.address}
          onChange={onChange}
          required
          className="border rounded px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="city" className="text-sm">Ciudad</label>
        <input
          id="city"
          name="city"
          type="text"
          value={form.city}
          onChange={onChange}
          required
          className="border rounded px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="district" className="text-sm">Distrito</label>
        <input
          id="district"
          name="district"
          type="text"
          value={form.district}
          onChange={onChange}
          required
          className="border rounded px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="reference" className="text-sm">Referencia</label>
        <input
          id="reference"
          name="reference"
          type="text"
          value={form.reference}
          onChange={onChange}
          className="border rounded px-3 py-2 text-sm"
        />
      </div>
    </fieldset>
  )
} 