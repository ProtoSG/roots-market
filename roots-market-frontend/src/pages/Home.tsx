import { MainContainer } from "../components/UI";
import { useProduct } from "../hooks/useProduct";
import { Hero, FeaturedProducts, ArtisanHighlight } from "../sections/Home";

export function Home(){
  const {productsRanking} = useProduct()

  return(
    <MainContainer className="flex-col gap-24 ">
      <Hero />
      <FeaturedProducts products={productsRanking} />
      <ArtisanHighlight />
    </MainContainer>
  )
}
