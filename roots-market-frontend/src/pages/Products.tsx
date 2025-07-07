import { ListProducts } from "../sections/Products/ListProducts";
import { MainContainer } from "../components/UI";
import { FilterProductsContianer } from "../sections/Products";
import { useProduct } from "../hooks/useProduct";

export function Products(){
  const { products } = useProduct()

  return(
    <MainContainer className="flex-col lg:flex-row gap-12">
      <FilterProductsContianer />
      <ListProducts products={products}/>
    </MainContainer>
  )
}
