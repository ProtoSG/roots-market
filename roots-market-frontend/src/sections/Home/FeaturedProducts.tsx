import { CardProduct } from "../../components/UI"
import { Product } from "../../models/product.model"

interface Props {
  products: Product[]
}

export function FeaturedProducts({ products }: Props){
  return(
    <section
      className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-8"
    >
      {products.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </section>
  )
}
