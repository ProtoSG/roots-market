import { CardArtisan } from "../../components/Artisans"
import { useArtisans } from "../../hooks/useArtisan"

interface Props {
  searchWord: string
}

export function ListArtisans({searchWord}: Props) {

  const artisans = useArtisans()

  const artisansFilter = artisans.filter((art) => art.name.toLocaleLowerCase().includes(searchWord.toLowerCase()))

  return (
    <section className="grid grid-cols-1 rounded-lg  md:grid-cols-2 lg:grid-cols-3 gap-12">
      {artisansFilter.map((artisan) => (
        <CardArtisan key={artisan.id} artisan={artisan} />
      ))}
    </section>
  )
}
