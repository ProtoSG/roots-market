import { Artisan } from "../../models/artisan.model"
import { useDialogStore } from "../../stores/dialogStore"
import { useArtisanStore } from "../../stores/itemStore"

interface Props {
  artisan: Artisan
}

export function CardArtisan({artisan}: Props) {
  const { setOpen } = useDialogStore()
  const { setItem } = useArtisanStore()

  const handleOpenDialog = () => {
    setOpen(true)
    setItem(artisan)
  }

  return (
    <article 
      className="flex flex-col p-4 rounded-lg gap-6 z-0 transition-all duration-300 group hover:cursor-pointer hover:scale-105 hover:shadow-xl/40 hover:drop-shadow-red-950/40"
      onClick={handleOpenDialog}
    >
      <header className="flex gap-4 items-center">
        <img 
          src={artisan.profileImageURL} 
          className="size-20 rounded-full object-cover"
        />
        <h4 className="font-semibold text-xl">{artisan.name}</h4>
      </header>
      <main>
        <p>{artisan.bio}</p>
      </main>
    </article>
  )
}
