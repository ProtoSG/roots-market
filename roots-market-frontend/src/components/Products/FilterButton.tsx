import { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/UI";
import { FilterIcon } from "../../icons";
import { FilterProducts } from "./FilterProducts";
import { useFilterStore } from "../../stores/filterStore";
import { ItemsFilter } from "./ItemsFilter";

export function FilterButton(){
  const [activeFilter, setActiveFilter ] = useState(false)
  const {
    categoryFilter,
    clearCategoryFilter,
    artisanFilter,
    clearArtisanFilter,
    rangeFilter,
    clearRangeFilter,
    MIN,
    MAX,
  } = useFilterStore()

  return(
    <div className="w-full flex justify-between relative">
      <div className="flex gap-4">
        {categoryFilter && 
          <ItemsFilter
            onClick={clearCategoryFilter}
            name={categoryFilter.name}
          />
        }
        {artisanFilter && 
          <ItemsFilter 
            name={artisanFilter.name}
            onClick={clearArtisanFilter}
          />
        }
        {(rangeFilter[0] !== MIN || rangeFilter[1] !== MAX) && (
          <ItemsFilter
            name={`S/ ${rangeFilter[0].toFixed(2).toString()} - ${rangeFilter[1].toFixed(2).toString()}`}
            onClick={clearRangeFilter}
          />
        )}
      </div>
      <section className="lg:hidden">
        <PrimaryButton
          onClick={() => {setActiveFilter(!activeFilter)}}
          className="gap-2 flex"
        >
          <p>Filtrar</p>
          <FilterIcon />
        </PrimaryButton>
        {activeFilter &&
          <FilterProducts
            className={`
              top-12 right-0 bg-white drop-shadow-2xl p-4 rounded-lg absolute flex
            `}
          />
        }
      </section>
    </div>
  )
}
