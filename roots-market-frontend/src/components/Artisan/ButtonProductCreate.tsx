import { PlusIcon } from "../../icons";
import { useProductCreateDialogStore } from "../../stores/dialogStore";

export function ButtonProductCreate(){
  const { setOpen } = useProductCreateDialogStore()

  return (
    <button onClick={() => setOpen(true)} className={`
        border border-dashed flex flex-col items-center p-4 cursor-pointer transition-colors rounded-lg
        hover:text-primary hover:border-primary
    `}>
        <p className="font-semibold text-xl">Agregar Producto</p>
        <PlusIcon className="size-48"/>
    </button>
  )
}