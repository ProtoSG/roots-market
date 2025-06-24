import { useProductStore } from "../../stores/itemStore"
import { useQuantityStore } from "../../stores/quantityStore"
import { AddShoppingCartButton } from "../Products"
import { ListTags } from "./ListTags"
import { QuantitySelector } from "./QuantitySelector"

export function ProductInfo(){
  const { item: product } = useProductStore()
  const { quantity, increment, decrement } = useQuantityStore()

  if (!product) return <p>No hay datos</p>

  return(
    <>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
        <img 
          className="h-64 w-full sm:w-48 object-cover rounded-lg"
          src={product.images[0].imageUrl}
        />
        <article 
          className="flex flex-col gap-5"
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold">{product.name}</h3>
            <ListTags tags={product.tags} />
          </div>
          <div>
            <div className="flex gap-3">
              <p className="font-semibold">Artesano:</p>
              <p>{product.artisanName}</p>
            </div>
            <div className="flex gap-3">
              <p className="font-semibold">Precio:</p>
              <p>S/ {product.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12">
            <QuantitySelector 
              quantity={quantity}
              increment={increment}
              decrement={decrement}
            />
            <AddShoppingCartButton product={product} />
          </div>
        </article>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-2xl font-semibold">Historia</h4>
        <p>{product.story}</p>
      </div>
    </>
  )
}
