interface Props {
  form: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function PersonalInfoSection({ form, onChange }: Props) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-semibold mb-1">Datos personales</legend>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm">Nombre completo</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
          required
          className="border rounded px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
          className="border rounded px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm">Teléfono</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={onChange}
          required
          className="border rounded px-3 py-2 text-sm"
        />
      </div>
    </fieldset>
  )
} 