import { ReactNode } from "react";

export function SubTitleForms({children}: {children: ReactNode}) {
  return (
    <h3 className="font-medium text-2xl">{children}</h3>
  )
}
