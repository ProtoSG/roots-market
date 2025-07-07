import { useArtisanPrivate } from "../../hooks/useArtisan"
import { CardAllInfoArtisan, ModaInfoArtisan, ModalAddRSArtisan, ModalUpdateSN } from "../../sections/Artisan/ArtisanInfo";

export function ArtisanInfo(){
  const {artisanInfo} = useArtisanPrivate()

  return (
    <section className="w-full min-h-full flex items-center justify-center">
      <CardAllInfoArtisan artisan={artisanInfo} />
      <ModaInfoArtisan />
      <ModalAddRSArtisan />
      <ModalUpdateSN />
    </section>
  )
}
