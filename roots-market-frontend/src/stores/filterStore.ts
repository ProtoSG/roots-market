import { create } from "zustand"
import { ItemFilter } from "../models/itemFilter.model"

interface Props {
  page: number
  setPage: (page: number) => void

  categoryFilter: ItemFilter  | null
  setCategoryFilter: ( categoryFilter: ItemFilter  | null) => void
  clearCategoryFilter: () => void 

  artisanFilter: ItemFilter | null
  setArtisanFilter: ( artisanFilter: ItemFilter | null) => void 
  clearArtisanFilter: () => void

  MIN: number 
  MAX: number
  rangeFilter: [number, number]
  setRangeFilter: (range: [number, number]) => void
  clearRangeFilter: () => void
}

const MIN = 0
const MAX = 1000

export const UseFilterStore = create<Props>((set) => ({
  page: 1,
  setPage: (page: number) => set({page}),

  categoryFilter: null,
  setCategoryFilter: (categoryFilter) => set({categoryFilter}),
  clearCategoryFilter: () => set({categoryFilter: null}),

  artisanFilter: null,
  setArtisanFilter: (artisanFilter) => set({artisanFilter}),
  clearArtisanFilter: () => set({artisanFilter: null}), 

  MIN,
  MAX,
  rangeFilter: [MIN, MAX],
  setRangeFilter: (rangeFilter: [number, number]) => set({rangeFilter}),
  clearRangeFilter: () => set({rangeFilter: [MIN, MAX]})
}))
