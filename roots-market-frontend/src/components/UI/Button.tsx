import { ReactNode } from "react"

interface Props{
  children: ReactNode
  onClick: () => void
}

export function Button({children, onClick}: Props){
  return(
    <button
      className={` 
        bg-primary m-auto rounded py-2 px-4 text-white transition-all focus:outline-none
        hover:bg-red-700 hover:cursor-pointer hover:scale-105 hover:drop-shadow-2xl
      `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
