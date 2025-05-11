import { useNavigate } from "react-router-dom"
import { useProductRankingById } from "../../hooks/useProduct"
import { FeaturedProducts } from "../../sections/Home"
import { useArtisanStore } from "../../stores/itemStore"
import { Tag, UnderlineText } from "../UI"
import { ItenSocialNetwork } from "./ItemSocialNetwork"
import { useFilterStore } from "../../stores/filterStore"
import { useDialogStore } from "../../stores/dialogStore"

export function ArtisanInfo() {
  const { item: artisan} = useArtisanStore()
  const { setArtisanFilter } = useFilterStore()
  const { setOpen } = useDialogStore()

  const products = useProductRankingById(artisan?.id || 0)

  const navigate = useNavigate()

  const handleViewMoreProducts = () => {
    setOpen(false)
    
    setArtisanFilter({
      id: artisan?.id || 0,
      name: artisan?.name || ""
    })

    navigate("/products")
  }

  if (!artisan) return <p> No hay datos </p>
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-16">
        <img 
          src={artisan.profileImageURL}
          alt={artisan.name}
          className="rounded-lg size-52 object-cover"
        />
        <article className="flex flex-col gap-4">
          <header
            className="flex justify-between items-center"
          >
            <h3 className="text-4xl font-bold">{artisan.name}</h3>
            <Tag name={artisan.location} />
          </header>
          <main>
            <p>{artisan.bio}</p>
          </main>
          <footer className="flex gap-8">
            {artisan.socialNetworks.map((sn) => (
              <ItenSocialNetwork
                key={sn.id}
                item={sn}
              />
            ))}
          </footer>
        </article>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Productos más destacados</h2>
        <UnderlineText onClick={handleViewMoreProducts}>
          Ver más
        </UnderlineText>
      </div>
      <FeaturedProducts products={products} />
    </div>
  )
}
