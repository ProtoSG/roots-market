import { MinusIcon, PlusIcon } from "../../icons";

interface Props{
  quantity: number 
  increment: () => void
  decrement: () => void
}

export function QuantitySelector({quantity, increment, decrement}: Props){

  return(
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12">
      <div className="flex gap-5 items-center">
        <button
          onClick={decrement}
          className={`
            rounded p-1 transition-colors hover:bg-primary hover:text-white
            ${quantity === 1 ? "cursor-not-allowed hover:bg-zinc-500" : "cursor-pointer"}
          `}
          disabled={quantity === 1}
        >
          <MinusIcon />
        </button>
        <span className="flex justify-center w-4">{quantity}</span>
        <button
          onClick={increment}
          className="rounded p-1 transition-colors hover:cursor-pointer hover:bg-primary hover:text-white"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  )
}
