import { ButtonProductCreate } from "../../../components/Artisan"
import { useArtisanPrivate } from "../../../hooks/useArtisan"
import { ModalUpdateProduct } from "./ModalCreateProduct";
import { useState } from "react";
import { useProductStore } from "../../../stores/itemStore";

export function ListArtisanProducts(){
  const { products } = useArtisanPrivate()
  const [isEditOpen, setEditOpen] = useState(false)
  const { item: selectedProduct, setItem: setSelectedProduct } = useProductStore()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ButtonProductCreate />
      {products.data.map(product => (
        <article
          key={product.id}
          className="z-0 flex flex-col gap-4 items-center transition-all duration-300 group  hover:cursor-pointer hover:scale-105 hover:drop-shadow-2xl hover:drop-shadow-red-950/40"
          onClick={() => { setSelectedProduct(product); setEditOpen(true); }}
        >
          <div className="w-full h-64 rounded bg-zinc-200">
            <img src={product.images[0].imageUrl} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="">
              <h3 className="text-lg text-center text-pretty">{product.name}</h3>
          </div>
        </article>
      ))}
      <ModalUpdateProduct product={selectedProduct} isOpen={isEditOpen} setOpen={setEditOpen} />
    </div>
  )
}
