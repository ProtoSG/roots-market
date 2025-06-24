import { useNavigate } from "react-router-dom";
import { HighlightedText, PrimaryButton, Title } from "../../components/UI";
import { ArrowIcon } from "../../icons";

export function Hero(){
  const navigate = useNavigate()
  return(
    <section className="flex flex-col gap-5 max-w-96 sm:max-w-xl mx-auto">
      <Title />
      <p className="text-center text-sm sm:text-lg text-pretty">
        Compre productos únicos elaborados{" "}
        <HighlightedText className="font-bold">artesanalmente</HighlightedText>
        {" "}con historias{" "} 
        <HighlightedText className="font-bold">arraigadas</HighlightedText> 
        {" "}en cada{" "}
        <HighlightedText className="font-bold">creación</HighlightedText>{"."}
      </p>
      <PrimaryButton 
        onClick={() => navigate("/products")}
        className="flex gap-2 items-center z-0 hover:scale-105 hover:drop-shadow-2xl m-auto"
      >
        <span className="font-bold">Comprar Ahora</span>
        <ArrowIcon className="rotate-180"/>
      </PrimaryButton>
    </section>
  )
}
