import { useArtisanPrivate } from "../../hooks/useArtisan"
import { CardAllInfoArtisan } from "../../sections/Artisan/ArtisanInfo";
import { ModaInfoArtisan } from "../../sections/Artisan/ArtisanInfo/ModalInfoArtisan";

export function ArtisanInfo(){
  const {artisanInfo} = useArtisanPrivate()

  return (
    <section className="w-full min-h-full flex items-center justify-center">
      <CardAllInfoArtisan artisan={artisanInfo} />
      <ModaInfoArtisan />
    </section>
  )
}
