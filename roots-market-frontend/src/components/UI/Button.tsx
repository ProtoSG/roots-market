import clsx from "clsx"
import { ReactNode } from "react"

interface Props{
  children: ReactNode
  onClick?: () => void
  className?: string
  type?: "submit" | "button" | "reset"
  disabled?: boolean
}

export function PrimaryButton({children, onClick, disabled = false, className, type="button"}: Props){
  return(
    <button
      type={type}
      className={clsx(` 
        bg-primary border border-primary rounded-lg py-2 px-4 text-white transition-all focus:outline-none
        hover:bg-red-700 hover:cursor-pointer
      `, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({children, onClick, disabled = false, className, type="button"}: Props) {
  return (
    <button
      type={type}
      className={clsx(`
        border border-primary text-primary rounded-lg py-2 px-4 transition-all focus:outline-none
        hover:bg-zinc-500 hover:border-zinc-500 hover:text-white hover:cursor-pointer
      `, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
