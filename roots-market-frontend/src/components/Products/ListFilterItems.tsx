import { useState } from "react";
import { UnderlineText } from "../UI";
import { ItemFilter } from "../../models/itemFilter.model";

interface Props{
  items: ItemFilter[]
  itemFilter: ItemFilter | null
  changeItemFileter: (item: ItemFilter) => void
}

export function ListFilterItems({items, changeItemFileter, itemFilter}: Props){
  const [ expandActive, setExpandActive ] = useState(false)

  const firstFiveCategories = items.slice(0, 5)
  const restCategories = items.slice(5);
  const visibleCategories = expandActive ? items : firstFiveCategories;
  const countRestCategories = restCategories.length

  const handleChangeExpand = () => {
    setExpandActive(!expandActive)
  }

  return(
    <>
      {visibleCategories.map((item) => (
        <span
          key={item.id}
          onClick={ () => changeItemFileter(item) }
          className={`
            cursor-pointer hover:underline hover:font-semibold
            ${itemFilter?.id === item.id && "font-bold underline"}
          `}
        >
          {item.name}
        </span>
      ))}      
      {items.length > 5 &&
        <UnderlineText onClick={handleChangeExpand}>
          {!expandActive ? `Mostrar ${countRestCategories} más` : `Ocultar`}
        </UnderlineText>
      }
    </>
  )
}
