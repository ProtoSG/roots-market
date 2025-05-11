import { useCategories } from "../../hooks/useCategory";
import { FiletrItemsContainer, ListFilterItems, PriceRange } from "../../components/Products";
import { useArtisans } from "../../hooks/useArtisan";
import { PrimaryButton, SecondaryButton } from "../../components/UI";
import { clsx } from "clsx";
import { useFilterStore } from "../../stores/filterStore";

interface Props{
  className?: string
}

export function FilterProducts({className}: Props){
  const categories = useCategories()
  const artisans = useArtisans()

  const { 
    categoryFilter,
    artisanFilter,
    clearRangeFilter,
    clearCategoryFilter,
    clearArtisanFilter,
    setCategoryFilter,
    setArtisanFilter
  } = useFilterStore()

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
            items={artisans}
            changeItemFileter={setArtisanFilter}
          />
        </FiletrItemsContainer>
        <PrimaryButton 
          onClick={() => {}}
          className="m-0 w-full"
        >
          APLICAR FILTROS
        </PrimaryButton>
        <SecondaryButton
          onClick={() => {}}
          className=""
        >
          ELIMINAR FILTROS
        </SecondaryButton>
      </section>
  )
}
