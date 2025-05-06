import { create } from "zustand";
import { Product } from "../models/product.model";

interface DialogState<T> {
  item: T | null
  isOpen: boolean

  setItem: (item: T) => void;
  setOpen: () => void;
}

export const createDialogStore = <T>() => create<DialogState<T>>((set) => ({
  item: null,
  isOpen: false,

  setItem: (item: T) => set({item}),
  setOpen: () => set((state) => ({isOpen: !state.isOpen}))
}))

export const useProductDialogStore = createDialogStore<Product>()
