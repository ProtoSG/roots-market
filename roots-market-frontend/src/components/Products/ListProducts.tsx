import { use } from "react"
import { Product } from "../../models/product.model"

export function ListProducts({productsPromise}: {productsPromise: Promise<Product[]>}) {
  const data = use(productsPromise)

  return (
    <>
      {data.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </>
  )
}
