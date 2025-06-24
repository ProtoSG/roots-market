import { useCategory } from "../../hooks/useCategory";
import { FiletrItemsContainer, ListFilterItems, PriceRange } from "../../components/Products";
import { SecondaryButton } from "../../components/UI";
import { clsx } from "clsx";
import { UseFilterStore } from "../../stores/filterStore";
import { useArtisanPublic } from "../../hooks/useArtisan";

interface Props{
  className?: string
}

export function FilterProducts({className}: Props){
  const {categories} = useCategory()
  const {artisans} = useArtisanPublic()

  const { 
    categoryFilter,
    artisanFilter,
    clearRangeFilter,
    clearCategoryFilter,
    clearArtisanFilter,
    setCategoryFilter,
    setArtisanFilter
  } = UseFilterStore()

  return (
      <section className={
        clsx(`min-w-64 max-w-64 lg:flex flex-col gap-4 z-10`, 
          className
        ) 
      }>
        <FiletrItemsContainer name="CATEGORIAS" onClearClick={clearCategoryFilter}>
          <ListFilterItems
            itemFilter={categoryFilter}
            items={categories}
            changeItemFileter={setCategoryFilter}
          />
        </FiletrItemsContainer>
        <FiletrItemsContainer name="RANGO DE PRECIO" onClearClick={ clearRangeFilter }>
          <PriceRange />
        </FiletrItemsContainer>
        <FiletrItemsContainer name="ARTESANOS" onClearClick={clearArtisanFilter}>
          <ListFilterItems
            itemFilter={artisanFilter}
            items={artisans.data}
            changeItemFileter={setArtisanFilter}
          />
        </FiletrItemsContainer>
        <SecondaryButton
          onClick={() => {}}
          className=""
        >
          ELIMINAR FILTROS
        </SecondaryButton>
      </section>
  )
}
