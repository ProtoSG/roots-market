import { ProductInfo } from "./ProductInfo";
import { useQuantityStore } from "../../stores/quantityStore";
import { DialogContainer } from "./DialogContainer";

export function ModalProduct() {
  const { reset } = useQuantityStore()

  return(
    <DialogContainer fn={reset}>
      <ProductInfo />
    </DialogContainer>
  )
}
