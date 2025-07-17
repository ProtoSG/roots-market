import clsx from "clsx"
import { ReactNode } from "react"

interface Props {
  visible: boolean 
  children: ReactNode
  className?: string
}

export function StepFieldset({visible, children, className}: Props){
  return (
    <fieldset
      className={clsx(
        "w-full flex flex-col gap-4 transition-transform",
        !visible && "hidden -translate-x-full",
        className
      )}
    >
      {children}
    </fieldset>
  )
}
