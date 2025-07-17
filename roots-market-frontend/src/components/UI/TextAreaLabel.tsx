import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface TextLabelProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  icon?: ReactNode;
  error: string | undefined
}

export const TextAreaLabel = forwardRef<HTMLTextAreaElement, TextLabelProps>(({ icon, error, ...inputProps}, ref) => {
  return (
    <>
      <label
        className="flex w-full py-2 px-3 gap-4 border border-[#323232] rounded "
      >
        {icon}
        <textarea
          ref={ref}
          {...inputProps}
          className="w-full  focus:outline-none resize-none"
          rows={6}
        />
      </label>
      {error && (
        <p className="text-sm text-center text-red-500">
          {error}
        </p>
      )}
    </>
  )
})
