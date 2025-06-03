import { useLastArtisan } from "../../hooks/useArtisan"

export function ArtisanHighlight(){
  const artisan = useLastArtisan()

  return(
    <section className="sm:flex gap-6">
      <div className="bg-zinc-300 min-h-full min-w-60 rounded">
        <img src={artisan.profileImageURL} className="h-full w-full rounded object-cover"/>
      </div>
      <article
        className="flex flex-col justify-center gap-8 py-3 min-h-full "
      >
        <header className="text-2xl font-semibold">Testimonio de {artisan.name.split(" ")[0]}</header>
        <main>
          <p>
            "{artisan.testimony}"
          </p>
        </main>
        <footer>
          <small className="underline transition-all hover:cursor-pointer hover:text-primary hover:text-sm">{artisan.name}</small>
        </footer>
      </article>
    </section>
  )
}
