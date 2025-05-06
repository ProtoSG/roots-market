import { ModalProduct } from "../components/UI";
import { Hero, FeaturedProducts, ArtisanHighlight } from "../sections/Home";

export function Home(){
  return(
    <main className="flex flex-col gap-24">
      <Hero />
      <FeaturedProducts />
      <ArtisanHighlight />
      <ModalProduct />
    </main>
  )
}
