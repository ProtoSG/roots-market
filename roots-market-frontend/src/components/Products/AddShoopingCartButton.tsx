import { toast } from "sonner";
import { Product } from "../../models/product.model";
import { useProductDiaglogStore } from "../../stores/dialogStore";
import { useQuantityStore } from "../../stores/quantityStore";
import { useShoppingCartStore } from "../../stores/shoppingCartStore";
import { PrimaryButton } from "../UI";

interface Props {
  product: Product
}

export function AddShoppingCartButton({product}: Props){ 
  const { quantity } = useQuantityStore()
  const { setOpen } = useProductDiaglogStore()
  const { addItem } = useShoppingCartStore()

  const handleAddItem = () => {
    const subTotal = quantity * product.price
    
    addItem({
      product,
      quantity,
      subTotal
    })

    setOpen(false)

    toast.success(`${product.name} se agregó al carrito de compras`)
  }

  return (
    <PrimaryButton onClick={handleAddItem}>
      Agregar al carrito
    </PrimaryButton>
  )
}
