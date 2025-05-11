import { ReactNode } from "react";
import { UnderlineText } from "../UI";

interface Props{
  name: string
  onClearClick: () => void
  children: ReactNode
}

export function FiletrItemsContainer({name, onClearClick, children}: Props){
  return(
    <article className="flex flex-col">
      <header className="flex justify-between">
        <h3 className="font-bold">{name}</h3>
        <UnderlineText onClick={onClearClick}>
          Borrar
        </UnderlineText>
      </header>
      <main className="flex flex-col gap-1 py-4 border-b-1 ">
        {children}
      </main>
    </article>
  )
}
