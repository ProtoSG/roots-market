import { clsx } from "clsx"
import { ReactNode } from "react"

interface Props{
  children: ReactNode
  className?: string
}

export function MainContainer({children, className}: Props){
  return(
    <main className={
      clsx("flex py-24", className
    )}>
      {children}
    </main>
  )
}
