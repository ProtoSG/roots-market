import { useNavigate } from "react-router-dom"
import { FeaturedProducts } from "../../sections/Home"
import { useArtisanStore } from "../../stores/itemStore"
import { ListItemsSocialNetwork, Tag, UnderlineText } from "../UI"
import { ItemSocialNetwork } from "./ItemSocialNetwork"
import { UseFilterStore } from "../../stores/filterStore"
import { useProduct } from "../../hooks/useProduct"
import { MailIcon } from "../../icons"

export function ArtisanInfo() {
  const { item: artisan} = useArtisanStore()
  const { setArtisanFilter } = UseFilterStore()
  const { productsRankingByArtisan: products } = useProduct()

  const navigate = useNavigate()

  const handleViewMoreProducts = () => {
    setArtisanFilter({
      id: artisan?.id || 0,
      name: artisan?.name || ""
    })

    navigate("/products")
  }

  if (!artisan) return <p> No hay datos </p>

  const validNetworks = artisan.socialNetworks?.filter(
    (sn) => sn && sn.id != null
  ) ?? [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-16">
        <img 
          src={artisan.profileImageURL}
          alt={artisan.name}
          className="rounded-lg size-52 object-cover"
        />
        <article className="flex flex-col gap-4 w-full">
          <header
            className="flex justify-between items-center"
          >
            <h3 className="text-4xl font-bold">{artisan.name}</h3>
            <Tag name={artisan.location} />
          </header>
          <main>
            <p>{artisan.bio}</p>
          </main>
          <footer className="flex flex-col gap-4">
            <ListItemsSocialNetwork items={validNetworks} />
            <a 
              target="_blank" 
              href={`mailto:${artisan.email}`}
              className="flex gap-2 items-center transition-colors hover:text-primary cursor-pointer group"
            >
              <MailIcon />
              <span className="group-hover:underline">{artisan.email}</span>
            </a>
          </footer>
        </article>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Productos más destacados</h2>
        {products.length !== 0 && (
          <UnderlineText onClick={handleViewMoreProducts}>
            Ver más
          </UnderlineText>
        )}
      </div>
      <FeaturedProducts products={products} />
    </div>
  )
}
