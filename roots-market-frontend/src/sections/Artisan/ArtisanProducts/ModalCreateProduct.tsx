import { useProductCreateDialogStore } from "../../../stores/dialogStore";
import { useProductCreateDialog } from "../../../hooks/useDialog";
import { DialogContainer } from "../../../components/UI";
import { FormCreateProduct, SubTitleForms } from "../../../components/Artisan";

export function ModalCreateProduct(){
  const { isOpen, setOpen } = useProductCreateDialogStore()
  const dialogRef = useProductCreateDialog(isOpen)

  return (
    <DialogContainer dialogRef={dialogRef} setOpen={setOpen}>
        <SubTitleForms>Crear Producto</SubTitleForms>
        <FormCreateProduct />
    </DialogContainer>
  )
}

export function ModalUpdateProduct({ product, isOpen, setOpen }: { product: any, isOpen: boolean, setOpen: (open: boolean) => void }){
  const dialogRef = useProductCreateDialog(isOpen)

  // Adaptar el producto para el formulario
  const adaptedProduct = product ? {
    ...product,
    images: Array.isArray(product.images) ? product.images.map((img: any) => img.imageUrl) : [],
    tags: Array.isArray(product.tags) ? product.tags.map((tag: any) => tag.name) : [],
  } : undefined

  return (
    <DialogContainer dialogRef={dialogRef} setOpen={setOpen}>
        <SubTitleForms>Editar Producto</SubTitleForms>
        <FormCreateProduct product={adaptedProduct} isEdit onClose={() => setOpen(false)} />
    </DialogContainer>
  )
}