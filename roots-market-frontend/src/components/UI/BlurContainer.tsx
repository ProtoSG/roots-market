import clsx from "clsx";
import { ReactNode } from "react";

export function BlurContainer({children, className}: {children: ReactNode, className?: string}) {
  return (
    <div className={clsx("flex items-center gap-2 font-semibold bg-zinc-500/30 backdrop-blur-lg rounded-full drop-shadow-xl/25", className
    )}>
    {children}
    </div>
  )
}
