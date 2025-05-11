import { create } from "zustand";

interface DialogState {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => set({isOpen})
}))
