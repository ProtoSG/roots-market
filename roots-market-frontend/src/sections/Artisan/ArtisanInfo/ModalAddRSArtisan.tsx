import { FormAddSocialNetworkArtisan, SubTitleForms } from "../../../components/Artisan";
import { DialogContainer } from "../../../components/UI";
import { useAddRSArtisanDialog } from "../../../hooks/useDialog";
import { useAddRSArtisanDialogStore } from "../../../stores/dialogStore";

export function ModalAddRSArtisan() {
  const { isOpen, setOpen } = useAddRSArtisanDialogStore()
  const dialogRef = useAddRSArtisanDialog(isOpen)

  return (
    <DialogContainer
      dialogRef={dialogRef}
      setOpen={setOpen}
    >
      <SubTitleForms>Agregar Red Social</SubTitleForms>
      <FormAddSocialNetworkArtisan />
    </DialogContainer>
  )
}
