import { useState } from "react";
import { useLogginDialog } from "../../hooks/useDialog";
import { uselogginDialogStore } from "../../stores/dialogStore";
import { DialogContainer } from "./DialogContainer";
import { FormSignup } from "./FormSignup";
import { Title } from "./Tittle";
import { FormSignin } from "./FormSignin";

export function ModalLoggin() {
  const { isOpen, setOpen } = uselogginDialogStore()
  const [isLoggin, setIsLoggin] = useState(true)
  const dialogRef = useLogginDialog(isOpen)

  return (
    <DialogContainer
      dialogRef={dialogRef}
      setOpen={setOpen}
      className="lg:max-w-xl"
    >
      <Title level={3} />
      <div className="mx-auto flex w-96  text-center rounded border p-1 gap-1">
        <p 
          onClick={() => setIsLoggin(true)}
          className={`
            flex-1 py-3 rounded cursor-pointer transition-colors
            ${isLoggin ? "bg-primary text-white" : "hover:bg-zinc-700/60 hover:text-white"}
          `}
        >
          Iniciar Sesión
        </p>
        <p 
          onClick={() => setIsLoggin(false)}
          className={`
            flex-1 py-3 rounded cursor-pointer transition-colors
            ${!isLoggin ? "bg-primary text-white" : "hover:bg-zinc-700/60 hover:text-white"}
          `}
        >
          Registrarse
        </p>
      </div>
      {isLoggin  
        ? <FormSignin />
        : <FormSignup />
      }
    </DialogContainer>
  )
}
