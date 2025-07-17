import { XIcon } from "../../icons"

interface Props {
  name: string
  onRemove?: () => void
}

export function Tag({name, onRemove}: Props){
  return(
    <small 
      className="flex items-center gap-2 bg-primary shadow-xl/20 px-3 py-1 rounded-full text-white"
    >
      {name}
      {onRemove && (
        <button
          className="cursor-pointer transition-colors hover:text-red-200"
          onClick={onRemove}
        >
          <XIcon />
        </button>
      )}
    </small>
  )
}