import { MainContainer } from "../components/UI";
import { useProductRanking } from "../hooks/useProduct";
import { Hero, FeaturedProducts, ArtisanHighlight } from "../sections/Home";

export function Home(){
  const products = useProductRanking()
  
  return(
    <MainContainer className="flex-col gap-24 ">
      <Hero />
      <FeaturedProducts products={products} />
      <ArtisanHighlight />
    </MainContainer>
  )
}
