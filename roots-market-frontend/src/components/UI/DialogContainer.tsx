import { ReactNode, RefObject } from "react"
import { ArrowIcon } from "../../icons"
import clsx from "clsx"

interface Props{
  children: ReactNode
  fn?: () => void
  dialogRef: RefObject<HTMLDialogElement | null>
  setOpen: (isOpen: boolean) => void
  className?: string
}

export function DialogContainer({children, fn, dialogRef, setOpen, className}: Props){
  const handleClose = () => {
    setOpen(false)
    if (fn) fn()
  }

  return(
    <dialog 
      ref={dialogRef}      
      onClose={handleClose}
      className={clsx(
        "m-auto bg-[#FAFAFA] w-full sm:max-w-4xl lg:max-w-4xl backdrop:backdrop-blur-sm backdrop:backdrop-brightness-90 focus:outline-none animate-fade-in",
        className
      )}
    >
      <section
        className="relative px-14 pb-16 pt-20 flex flex-col gap-8"
      >
        <span
          onClick={handleClose}
          className="absolute top-8 transition-all hover:cursor-pointer hover:text-primary hover:scale-125"
        >
          <ArrowIcon />
        </span>
        {children}
      </section>
    </dialog>
  )
}
