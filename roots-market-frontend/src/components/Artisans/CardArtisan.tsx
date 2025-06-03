import { Artisan } from "../../models/artisan.model"
import { useArtisanDialogStore } from "../../stores/dialogStore"
import { useArtisanStore } from "../../stores/itemStore"
import { PrimaryButton } from "../UI"

interface Props {
  artisan: Artisan
}

export function CardArtisan({artisan}: Props) {
  const { setOpen } = useArtisanDialogStore()
  const { setItem } = useArtisanStore()

  const handleOpenDialog = () => {
    setOpen(true)
    setItem(artisan)
  }

  return (
    <article 
      className="flex flex-col bg-white p-4 rounded-lg gap-6 z-0 "
    >
      <header className="flex flex-col gap-4 items-center">
        <img 
          src={artisan.profileImageURL} 
          className="w-full h-40 rounded-lg object-cover"
        />
        <h4 className="font-semibold text-2xl">{artisan.name}</h4>
      </header>
      <main className="flex h-full flex-col justify-between gap-8">
        <p>{artisan.bio.slice(0, 120)}...</p>
        <PrimaryButton onClick={handleOpenDialog} className="w-full">Ver Info</PrimaryButton>
      </main>
    </article>
  )
}
