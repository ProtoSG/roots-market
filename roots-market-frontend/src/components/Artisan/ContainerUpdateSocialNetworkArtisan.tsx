import { useAddRSArtisanDialogStore, useInfoArtisanDialogStore, useUpdateSNDialogStore } from "../../stores/dialogStore"
import { useArtisanUpdateStore, useSNUpdateStore } from "../../stores/itemStore"
import { PrimaryButton, SecondaryButton } from "../UI"
import { EditIcon } from "../../icons"
import { SubTitleForms } from "./SubTitleForms"
import { ItemSocialNetwork } from "../Artisans"

export function ContainerUpdateSocialNetworkArtisan(){
  const { setOpen: setOpenDialogAddSR } = useAddRSArtisanDialogStore()
  const { setOpen: setOpenDialogInfoArtisan } = useInfoArtisanDialogStore()
  const { setOpen: setOpenDialogUpdateSN } = useUpdateSNDialogStore()

  const { item: artisan } = useArtisanUpdateStore()
  const { setItem: setSocialNetworkItem } = useSNUpdateStore()

  const validNetworks = artisan?.socialNetworks?.filter(
    (sn) => sn && sn.id != null
  ) ?? [];

  const handleChangeOpenDialogs = () => {
    setOpenDialogInfoArtisan(false)
    setOpenDialogAddSR(true)
  }

  return(
    <main className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <SubTitleForms>Redes Sociales</SubTitleForms>
      </div>
      <div className="flex flex-col gap-3">
        {validNetworks.length === 0 ? (
          <p className="text-primary">No hay redes sociales</p>
        ) : (
          validNetworks.map((sn) => (
            <div className="flex gap-4">
              <ItemSocialNetwork key={sn.id} item={sn} />
              <button
                onClick={() => {
                  setOpenDialogUpdateSN(true)
                  setSocialNetworkItem(sn)
                }}
                className="flex gap-1 items-center text-xs transition-colors hover:text-primary hover:underline cursor-pointer"
              >
                <EditIcon className="size-4"/>
                editar
              </button>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-end gap-4">
        <SecondaryButton
          type="button"
          onClick={() => setOpenDialogInfoArtisan(false)}
        >
          Cancelar
        </SecondaryButton>
        <PrimaryButton onClick={handleChangeOpenDialogs}>
          Agregar
        </PrimaryButton>
      </div>
    </main>
  )
}
