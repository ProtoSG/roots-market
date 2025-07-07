import { FormUpdateSocialNetworkArtisan } from "../../../components/Artisan";
import { DialogContainer } from "../../../components/UI";
import { useUpdateSNDialog } from "../../../hooks/useDialog";
import { useUpdateSNDialogStore } from "../../../stores/dialogStore";

export function ModalUpdateSN() {
  const { isOpen, setOpen } = useUpdateSNDialogStore()
  const dialogRef = useUpdateSNDialog(isOpen)

  return (
    <DialogContainer
      dialogRef={dialogRef}
      setOpen={setOpen}
    >
      <FormUpdateSocialNetworkArtisan />
    </DialogContainer>
  )
}
