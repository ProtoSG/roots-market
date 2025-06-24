import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Slider from "react-slider";
import debounce from "lodash.debounce";
import { UseFilterStore } from "../../stores/filterStore";

export function PriceRange(){
  const { MIN, MAX, rangeFilter, setRangeFilter } = UseFilterStore()
  const [tempRange, setTempRange] = useState<[number, number]>(rangeFilter);

  const debouncedSetRange = useMemo(
    () => debounce((r: [number, number]) => setRangeFilter(r), 300),
    [setRangeFilter]
  );

  useEffect(() => {
    setTempRange(rangeFilter);
  }, [rangeFilter]);

  useEffect(() => {
    return () => {
      debouncedSetRange.cancel();
    };
  }, [debouncedSetRange]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const num = Number(value);
    const next: [number, number] = [...tempRange];

    if (name === "min" && num <= tempRange[1]) {
      next[0] = num;
    }
    if (name === "max" && num >= tempRange[0]) {
      next[1] = num;
    }

    setTempRange(next);
    debouncedSetRange(next);
  };

  // Handler para el slider
  const handleSliderChange = (val: [number, number]) => {
    setTempRange(val);
    debouncedSetRange(val);
  };

  return (
    <div className="flex flex-col gap-4">
        <Slider
          className="w-full h-2 slider"
          min={MIN}
          max={MAX}
          onChange={handleSliderChange}
          onAfterChange={setRangeFilter}
          value={tempRange}
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
          value={tempRange[0]}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="max"
          className="w-1/2 border px-2 py-1 rounded text-sm"
          placeholder="Precio Max"
          value={tempRange[1]}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
