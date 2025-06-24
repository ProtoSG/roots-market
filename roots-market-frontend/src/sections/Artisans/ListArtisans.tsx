import { CardArtisan } from "../../components/Artisans"
import { Paginations } from "../../components/UI"
import { useArtisanPublic } from "../../hooks/useArtisan"
import { FilterArtisansStore } from "../../stores/filterArtisansStore"

interface Props {
  searchWord: string
}

export function ListArtisans({searchWord}: Props) {
  const {artisans} = useArtisanPublic()
  const {setPage} = FilterArtisansStore()

  const artisansFilter = artisans.data.filter((art) => art.name.toLocaleLowerCase().includes(searchWord.toLowerCase()))

  const page = artisans.meta.page
  const totalPages = artisans.meta.totalPages

  return (
    <section>
      <div className="grid grid-cols-1 rounded-lg  md:grid-cols-2 lg:grid-cols-3 gap-12">
        {artisansFilter.map((artisan) => (
          <CardArtisan key={artisan.id} artisan={artisan} />
        ))}
      </div>
      <Paginations page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  )
}
