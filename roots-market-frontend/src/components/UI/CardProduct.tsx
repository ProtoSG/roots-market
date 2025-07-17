import { Product } from "../../models/product.model"
import { useProductDiaglogStore } from "../../stores/dialogStore"
import { useProductStore } from "../../stores/itemStore"

interface Props {
  product: Product
}

export function CardProduct({product}: Props){
  const { setOpen } = useProductDiaglogStore()
  const { setItem } = useProductStore()

  const handleOpenDialog = () => {
    setOpen(true)
    setItem(product)
  }

  return(
    <article
      className="z-0 flex flex-col gap-4 items-center transition-all duration-300 group  hover:cursor-pointer hover:scale-105 hover:drop-shadow-2xl hover:drop-shadow-red-950/40"
      onClick={handleOpenDialog}
    >
      <div className="w-full h-64 rounded bg-zinc-200">
        <img src={product.images[0].imageUrl} className="w-full h-full object-cover rounded-lg" loading="lazy" width={300} height={256} />
      </div>
    <div className="">
        <h3 className="text-lg text-center text-pretty">{product.name}</h3>
        <p className="text-center">S/ {product.price.toFixed(2)}</p>
      </div>
    </article>
  )
}
