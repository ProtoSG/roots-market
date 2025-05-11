import { ChangeEvent, useState } from "react";
import { MainContainer, SearchInput } from "../components/UI";
import { ListArtisans } from "../sections/Artisans";
import { ModalArtisan } from "../components/Artisans";

export function Artisans(){
  const [ searchWord, setSearchWord ] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    if( name === "search") setSearchWord(value)
  }

  return(
    <MainContainer className="flex-col gap-8">
      <SearchInput
        name="search"
        value={searchWord}
        onChange={handleChange}
        placeholder="Buscar artesano..."
      />
      <ListArtisans searchWord={searchWord} />
      <ModalArtisan />
    </MainContainer>
  )
}
