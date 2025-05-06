import { Product } from "../../models/product.model"
import { useProductDialogStore } from "../../stores/dialogStore"

interface Props {
  product: Product
}

export function CardProduct({product}: Props){
  const {setOpen, setItem} = useProductDialogStore()

  const handleOpenDialog = () => {
    setOpen()
    setItem(product)
  }

  return(
    <article
      className="flex flex-col gap-4 items-center transition-all duration-300 group hover:cursor-pointer hover:scale-105 hover:drop-shadow-2xl hover:drop-shadow-red-950/40"
      onClick={handleOpenDialog}
    >
      <div className="w-full h-64 rounded bg-zinc-200">
        <img src={product.images[0]} className="w-full h-full object-cover rounded" />
      </div>
    <div className="">
        <h3 className="text-lg">{product.name}</h3>
        <p className="text-center">S/ {product.price.toFixed(2)}</p>
      </div>
    </article>
  )
}
