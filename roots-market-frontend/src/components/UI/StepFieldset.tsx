import { ReactNode } from "react"

interface Props {
  visible: boolean 
  children: ReactNode
}

export function StepFieldset({visible, children}: Props){
  return (
    <fieldset
      className={`
        w-full flex flex-col gap-4 transition-transform
        ${!visible ? "hidden -translate-x-full" : ""}
      `}
    >
      {children}
    </fieldset>
  )
}
