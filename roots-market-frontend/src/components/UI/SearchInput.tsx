import { ChangeEvent } from "react";
import { SearchIcon } from "../../icons";

interface Props{
  name: string
  value: string 
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string
}

export function SearchInput({name, value, onChange, placeholder}: Props){
  return(
    <label
      className="flex w-full items-center px-3 gap-4 border border-[#323232] rounded "
    >
      <SearchIcon />
      <input 
        name={name}
        value={value}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-2 focus:outline-none"
      />
    </label>
  )
}
