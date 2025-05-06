import { useEffect, useRef } from "react";
import { Product } from "../../models/product.model";
import { useDialogStore, useProductDialogStore } from "../../stores/dialogStore";
import { Button } from "./Button";
import { MinusIcon, PlusIcon } from "../../icons";

// interface Props{
//   product?: Product
// }

export function ModalProduct() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const {isOpen, item, setOpen  } = useProductDialogStore()

  useEffect(() => {
    if (!dialogRef.current) return

    if (isOpen) dialogRef.current.showModal()
    else dialogRef.current.close()
  }, [isOpen])

  return(
    <dialog 
      ref={dialogRef}      
      onClose={setOpen}
      className="m-auto w-full sm:max-w-4xl lg:max-w-4xl backdrop:backdrop-blur-sm backdrop:backdrop-brightness-90 focus:outline-none"
    >
      {!item ? (
        <p>No hay producto</p>
      ) : (
      <section
        className="px-14 py-16 flex flex-col gap-8"
      >
        <div className="flex gap-12">
          <img 
            className="h-64 w-48 object-cover rounded"
            src={item.images[0]}
          />
          <article 
            className="flex flex-col gap-5"
          >
            <div>
              <h3 className="text-3xl font-bold">{item.name}</h3>
              <div className="flex gap-3">
                {item.tags.map((tag, index) => (
                  <small 
                    key={index}
                    className="bg-primary px-3 py-1 rounded-full text-white"
                  >{tag}</small>
                ))}
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <p className="font-semibold">Artesano:</p>
                <p>{item.artisanName}</p>
              </div>
              <div className="flex gap-3">
                <p className="font-semibold">Precio:</p>
                <p>S/ {item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex gap-12">
              <div className="flex gap-5 items-center">
                <span
                  className="rounded p-1 transition-colors hover:cursor-pointer hover:bg-primary hover:text-white"
                >
                  <MinusIcon />
                </span>
                <span>1</span>
                <span
                  className="rounded p-1 transition-colors hover:cursor-pointer hover:bg-primary hover:text-white"
                >
                  <PlusIcon />
                </span>
              </div>
              <Button onClick={() => {}}>Agregar al carrito</Button>
            </div>
          </article>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-2xl font-semibold">Historia</h4>
          <p>{item.story}</p>
        </div>
      </section>
      )}
    </dialog>
  )
}
