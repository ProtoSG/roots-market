import { MainContainer } from "./components/UI";

import { Title } from "./components/UI";
import { LoadIcon } from "./icons";

export function LoadingBackPage() {
  return (
    <MainContainer className="flex-col items-center gap-24">
      <Title />
      <div className="flex flex-col gap-2 border-3 p-2 border-primary rounded-lg items-center">
        <div className="flex gap-2 items-center">
          <LoadIcon className="size-8 animate-spin" />
          <p className="text-lg">Cargando datos del backend...</p>
        </div>
        <small className="text-wrap w-80 text-center">Recordar que el backend se encuentra desplegado en <strong>Render</strong> con un <strong>plan gratuito</strong>, por lo que puede tardar en responder.</small>
      </div>
    </MainContainer>
  );
}