import { ReactNode } from "react"

interface Props{
  children: ReactNode
  onClick: () => void
}

export function UnderlineText({children, onClick}: Props){
  return(
    <span 
      onClick={onClick}
      className="text-primary transition-all cursor-pointer hover:underline"
    >
      {children}
    </span>
  )
}
