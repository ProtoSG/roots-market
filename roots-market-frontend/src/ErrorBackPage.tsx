import { MainContainer, Title } from "./components/UI";
import { AlertIcon } from "./icons";

export default function ErrorBackPage({error}: {error: string}) {
  return (
    <MainContainer className="flex-col items-center gap-24">
      <Title />
      <div className="flex flex-col gap-2 border-3 p-2 border-primary rounded-lg ">
        <div className="text-primary flex gap-2 items-center">
          <AlertIcon className="size-8" />
          <p className="font-bold text-lg">Error:</p>
        </div>
        <p className="px-1">{error}</p>
      </div>
    </MainContainer>
  )
}
