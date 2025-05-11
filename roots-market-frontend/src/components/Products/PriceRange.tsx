import { ChangeEvent } from "react";
import Slider from "react-slider";
import { useFilterStore } from "../../stores/filterStore";

export function PriceRange(){
  const { MIN, MAX, rangeFilter, setRangeFilter } = useFilterStore()

  const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value, name } = e.target
    const valueNumber = Number(value)

    if ( name === "min" && valueNumber <= rangeFilter[1] ) {
      setRangeFilter([valueNumber, rangeFilter[1]])
    }
    if ( name === "max" && valueNumber >= rangeFilter[0] ){
      setRangeFilter([rangeFilter[0], valueNumber])
    }
  }

  return (
    <div className="flex flex-col gap-4">
        <Slider
          className="w-full h-2 slider"
          min={MIN}
          max={MAX}
          onChange={setRangeFilter}
          value={rangeFilter}
          thumbClassName="bg-primary size-5 rounded-full -mt-[8px] focus:outline-none"
          trackClassName="bg-[#E3E3E3] h-1 track"
          minDistance={50}
      />

      <div className="flex space-x-2">
        <input
          type="number"
          name="min"
          className="w-1/2 border px-2 py-1 rounded text-sm"
          placeholder="Precio Min"
          value={rangeFilter[0]}
          onChange={handleChangeRange}
        />
        <input
          type="number"
          name="max"
          className="w-1/2 border px-2 py-1 rounded text-sm"
          placeholder="Precio Max"
          value={rangeFilter[1]}
          onChange={handleChangeRange}
        />
      </div>
    </div>
  );
};
