import { create } from "zustand"

interface Props{
  quantity: number 

  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useQuantityStore = create<Props>((set) => ({
  quantity: 1,

  increment: () => set((state) => ({ quantity: state.quantity + 1 })),
  decrement: () => set((state) => {
    if (state.quantity === 1) return { quantity: state.quantity}
    return {quantity: state.quantity - 1}
  }),
  reset: () => set(() => ({ quantity: 1 }))
}))
