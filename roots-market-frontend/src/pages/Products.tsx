import { useProduct } from "../hooks/useProduct";

export function Products(){
  const data = useProduct()

  return(
    <div>
        {data.map((product) => (
          <p key={product.id}>{product.name}</p>
        ))}
        {/* <ListProducts productsPromise={productPromise} /> */}
    </div>
  )
}
