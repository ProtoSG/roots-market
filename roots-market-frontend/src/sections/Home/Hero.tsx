import { Button, HighlightedText } from "../../components/UI";

export function Hero(){
  return(
    <section className="flex flex-col gap-5 max-w-96 sm:max-w-xl mx-auto">
      <h1 className="text-8xl sm:text-9xl text-center text-primary font-rochester">
        Roots Market
      </h1>
      <p className="text-center text-sm sm:text-lg text-pretty">
        Compre productos únicos elaborados{" "}
        <HighlightedText className="font-bold">artesanalmente</HighlightedText>
        {" "}con historias{" "} 
        <HighlightedText className="font-bold">arraigadas</HighlightedText> 
        {" "}en cada{" "}
        <HighlightedText className="font-bold">creación</HighlightedText>{"."}
      </p>
      <Button 
        onClick={() => {}}
      >
        Comprar Ahora
      </Button>
    </section>
  )
}
