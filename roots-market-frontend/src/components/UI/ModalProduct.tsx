import { ProductInfo } from "./ProductInfo";
import { useQuantityStore } from "../../stores/quantityStore";
import { DialogContainer } from "./DialogContainer";
import { useProductDiaglogStore } from "../../stores/dialogStore";
import { useProductDialog } from "../../hooks/useDialog";

export function ModalProduct() {
  const { isOpen, setOpen } = useProductDiaglogStore()
  const dialogRef = useProductDialog(isOpen)
  const { reset } = useQuantityStore()

  return(
    <DialogContainer
      fn={reset}
      dialogRef={dialogRef}
      setOpen={setOpen}
    >
      <ProductInfo />
    </DialogContainer>
  )
}
