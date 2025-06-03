import {  forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  error: string | undefined
}

export const InputLabel = forwardRef<HTMLInputElement, InputLabelProps>(({ icon, error, ...inputProps }, ref) => {
    return(
    <>
      <label
        className="flex w-full  items-center px-3 gap-4 border border-[#323232] rounded "
      >
        {icon}
        <input 
          ref={ref}
          {...inputProps}
          className="w-full py-2 focus:outline-none"
        />
      </label>
      <p className="text-sm text-center text-red-500">
        {error}
      </p>
    </>
    )
  }
)
