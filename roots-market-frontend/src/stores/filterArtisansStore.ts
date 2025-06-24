import { create } from "zustand"

interface Props {
  page: number 
  setPage: (page: number) => void 
}

export const FilterArtisansStore = create<Props>((set) => ({
  page: 1,
  setPage: (page: number) => set({page})
}))
