import { useEffect, useRef } from "react";

function useDialog(isOpen: boolean) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!dialogRef.current) return 
    if (isOpen) dialogRef.current.showModal() 
    else dialogRef.current.close()
  }, [isOpen])

  return dialogRef
}

export const useProductDialog = (isOpen: boolean) => useDialog(isOpen)
export const useArtisanDialog = (isOpen: boolean) => useDialog(isOpen)
export const useLogginDialog = (isOpen: boolean) => useDialog(isOpen)
export const useInfoArtisanDialog = (isOpen: boolean) => useDialog(isOpen)
