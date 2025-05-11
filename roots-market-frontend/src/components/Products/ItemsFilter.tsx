import { XIcon } from "../../icons";
import { SecondaryButton } from "../UI";

interface Props {
  name: string 
  onClick: () => void
}

export function ItemsFilter({name, onClick}: Props )  {
  return (
    <SecondaryButton
      onClick={onClick}
      className="border-full flex gap-2"
    >
      <span>{name}</span>
      <XIcon />
    </SecondaryButton>
  )
}
