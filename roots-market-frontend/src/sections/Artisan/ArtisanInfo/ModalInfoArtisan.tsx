import { DialogContainer } from "../../../components/UI";
import { useInfoArtisanDialog } from "../../../hooks/useDialog";
import { useInfoArtisanDialogStore } from "../../../stores/dialogStore";
import { FormUpdateInfoArtisan, ContainerUpdateSocialNetworkArtisan, ItemHeaderForm } from "../../../components/Artisan";
import { useState } from "react";

export function ModaInfoArtisan() {
  const { isOpen, setOpen } = useInfoArtisanDialogStore()
  const dialogRef = useInfoArtisanDialog(isOpen)

  const [isSelectFirst, setIsSelectFirst] = useState(true)

  return (
    <DialogContainer
      dialogRef={dialogRef}
      setOpen={setOpen}
    >
      <header className="flex gap-4 ">
        <ItemHeaderForm
          onClick={() => setIsSelectFirst(true)}
          active={isSelectFirst}
        >Información</ItemHeaderForm>
        <ItemHeaderForm 
          onClick={() => setIsSelectFirst(false)}
          active={!isSelectFirst}
        >Redes Sociales</ItemHeaderForm>
      </header>
      {isSelectFirst 
        ? <FormUpdateInfoArtisan />
        : <ContainerUpdateSocialNetworkArtisan />
      }
    </DialogContainer>
  )
}
