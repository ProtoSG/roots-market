import { ListArtisanProducts, ModalCreateProduct } from "../../sections/Artisan/ArtisanProducts";

export function ArtisanProducts(){
  return (
    <section className="w-full min-h-full flex items-start">
      <ListArtisanProducts />
      <ModalCreateProduct />
    </section>
  )
}