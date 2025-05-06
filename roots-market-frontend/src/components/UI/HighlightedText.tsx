import { clsx } from "clsx"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

export function HighlightedText({children, className}: Props){
  return(
    <span className={clsx("text-primary", className)}>
      {children}
    </span>
  )
}
