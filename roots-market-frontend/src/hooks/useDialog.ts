import { useEffect, useRef } from "react";

export function useDialog(isOpen: boolean) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!dialogRef.current) return 
    if (isOpen) dialogRef.current.showModal() 
    else dialogRef.current.close()
  }, [isOpen])

  return dialogRef
}
