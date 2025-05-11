import { CardArtisan } from "../../components/Artisans"
import { useArtisans } from "../../hooks/useArtisan"

interface Props {
  searchWord: string
}

export function ListArtisans({searchWord}: Props) {

  const artisans = useArtisans()

  const artisansFilter = artisans.filter((art) => art.name.toLocaleLowerCase().includes(searchWord.toLowerCase()))

  return (
    <section className="grid grid-cols-1  md:grid-cols-2 gap-12">
      {artisansFilter.map((artisan) => (
        <CardArtisan artisan={artisan} />
      ))}
    </section>
  )
}
