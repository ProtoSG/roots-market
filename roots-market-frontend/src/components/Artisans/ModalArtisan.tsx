import { useArtisanDialog } from "../../hooks/useDialog";
import { useArtisanDialogStore } from "../../stores/dialogStore";
import { DialogContainer } from "../UI";
import { ArtisanInfo } from "./ArtisanInfo";

export function ModalArtisan( ) {
  const { isOpen, setOpen } = useArtisanDialogStore()
  const dialogRef = useArtisanDialog(isOpen)

  return (
    <DialogContainer
      setOpen={setOpen}
      dialogRef={dialogRef}
    >
      <ArtisanInfo />
    </DialogContainer>
  )
}
