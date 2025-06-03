import { ListProducts } from "../sections/Products/ListProducts";
import { MainContainer } from "../components/UI";
import { FilterProductsContianer } from "../sections/Products";

export function Products(){
  return(
    <MainContainer className="flex-col lg:flex-row gap-12">
      <FilterProductsContianer />
      <ListProducts />
    </MainContainer>
  )
}
