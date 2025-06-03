import { create } from "zustand";

interface DialogState {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void;
}

const createDialogStore = () => create<DialogState>((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => set({isOpen})
}))

export const useProductDiaglogStore = createDialogStore()
export const useArtisanDialogStore = createDialogStore()
export const uselogginDialogStore = createDialogStore()
