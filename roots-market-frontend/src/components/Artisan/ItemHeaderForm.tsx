import { ReactNode } from "react"

interface Props {
  onClick: () => void 
  active: boolean 
  children: ReactNode
}

export function ItemHeaderForm({onClick, active, children}: Props) {
  return (
    <span 
      onClick={onClick}
      className={`
        border-b-2 px-4 cursor-pointer
        ${active ? "text-primary border-primary" : "border-zinc-600 hover:text-primary/80 hover:border-primary/80"}
      `}
    >{children}</span>
  )
}
