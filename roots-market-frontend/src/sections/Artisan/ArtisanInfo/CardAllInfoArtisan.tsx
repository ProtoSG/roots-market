import { ListItemsSocialNetwork, PrimaryButton } from "../../../components/UI";
import { EditIcon } from "../../../icons";
import { Artisan } from "../../../models/artisan.model"
import { useInfoArtisanDialogStore } from "../../../stores/dialogStore";
import { useArtisanUpdateStore } from "../../../stores/itemStore";

interface Props {
  artisan: Artisan
}

export function CardAllInfoArtisan({artisan}: Props) {
  const { setOpen } = useInfoArtisanDialogStore()
  const { setItem } = useArtisanUpdateStore()

  const validNetworks = artisan.socialNetworks?.filter(
    (sn) => sn && sn.id != null
  ) ?? [];

  const handelOpenDialog = () => {
    setItem(artisan)
    setOpen(true)
  }

  return(
    <article className="m-auto bg-white drop-shadow-xl/25 rounded-lg p-4 w-96">
      <header className="flex flex-col gap-4">
        <img 
          src={artisan.profileImageURL} 
          alt={`foto de perfil de ${artisan.name}`}
          className="w-full rounded-xl object-contain"
        />
          <h3 className="text-2xl text-center font-bold">{artisan.name}</h3>
        <div className="flex gap-4 items-center justify-center">
          <ListItemsSocialNetwork items={validNetworks} />
        </div>
      </header>
      <main className="flex flex-col gap-8 mt-8">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-2xl">Biografía</h3>
          <p className="text-pretty">{artisan.bio}</p>
        </div>
        <PrimaryButton
          className="flex justify-center gap-2"
          onClick={handelOpenDialog}
        >
          <EditIcon />
          <span>Editar Perfil</span>
        </PrimaryButton>
      </main>
    </article>
  )
}
