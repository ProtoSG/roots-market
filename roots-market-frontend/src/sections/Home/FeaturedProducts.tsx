import { CardProduct } from "../../components/UI"
import { useProductRanking } from "../../hooks/useProduct"

export function FeaturedProducts(){
  const products = useProductRanking()

  return(
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {products.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </section>
  )
}
