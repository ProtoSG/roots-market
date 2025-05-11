import { create } from "zustand"
import { ItemFilter } from "../models/itemFilter.model"

interface Props {
  categoryFilter: ItemFilter  | null
  setCategoryFilter: ( categoryFilter: ItemFilter  ) => void
  clearCategoryFilter: () => void 

  artisanFilter: ItemFilter | null
  setArtisanFilter: ( artisanFilter: ItemFilter ) => void 
  clearArtisanFilter: () => void

  MIN: number 
  MAX: number
  rangeFilter: number[]
  setRangeFilter: (range: number[]) => void
  clearRangeFilter: () => void
}

const MIN = 0
const MAX = 1000

export const useFilterStore = create<Props>((set) => ({
  categoryFilter: null,
  setCategoryFilter: (categoryFilter) => set({categoryFilter}),
  clearCategoryFilter: () => set({categoryFilter: null}),

  artisanFilter: null,
  setArtisanFilter: (artisanFilter) => set({artisanFilter}),
  clearArtisanFilter: () => set({artisanFilter: null}), 

  MIN,
  MAX,
  rangeFilter: [MIN, MAX],
  setRangeFilter: (rangeFilter) => set({rangeFilter}),
  clearRangeFilter: () => set({rangeFilter: [MIN, MAX]})
}))
