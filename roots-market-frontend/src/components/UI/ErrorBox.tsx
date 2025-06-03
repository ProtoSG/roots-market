import { AlertIcon } from "../../icons";

export function ErrorBox({error}: {error: string}){
  return (
    <div className="bottom-4 right-4 absolute w-96 flex gap-2 rounded-lg p-2 border border-primary bg-amber-800 text-white ">
      <AlertIcon />
      {error}
    </div>
  )
}
