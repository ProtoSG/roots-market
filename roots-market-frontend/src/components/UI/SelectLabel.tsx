import { ReactNode, SelectHTMLAttributes } from "react";

interface SelectLabelProps extends SelectHTMLAttributes<HTMLSelectElement> {
    icon?: ReactNode
    data: {
        id: string
        name: string
    }[],
    error: string | undefined
}

export const SelectLabel = ({icon, data, error, ...selectProps}: SelectLabelProps) => {
    return(
    <div className="flex flex-col gap-2">
        <label
            className="flex w-full  items-center px-3 gap-4 border border-[#323232] rounded "
        >
            {icon}
            <select 
            {...selectProps}
            className="w-full py-2 focus:outline-none"
            >
                {data.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </label>
        {error && (
            <p className="text-sm text-center text-red-500">
            {error}
            </p>
        )}
      </div>
    )
}