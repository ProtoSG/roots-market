import { create } from "zustand";
import { Product } from "../models/product.model";

interface ItemState {
  product: Product
  quantity: number 
  subTotal: number
}

interface State {
  items: ItemState[]
  total: number
  count: number

  addItem: (item: ItemState) => void
  removeItem: (id: number) => void
  clear: () => void
}

function calculateTotal(items: ItemState[]): number {
  return items.reduce((acc, item) => acc + item.subTotal, 0)
}

export const useShoppingCartStore = create<State>((set) => ({
  items: [],
  total: 0,
  count: 0,

  addItem: (newItem: ItemState)  => 
    set((state) => {
      const foundItem = state.items.findIndex(
        (item) => item.product.id === newItem.product.id
      )

      if (foundItem === -1) {
        const newItems = [...state.items, newItem]

        return {
          count: state.count + 1,
          items: newItems,
          total: calculateTotal(newItems)
        }
      }

      const updatedItems = state.items.map((item) =>
      item.product.id === newItem.product.id 
        ? {
          ...item,
          quantity: item.quantity + newItem.quantity,
          subTotal: item.subTotal + newItem.subTotal, 
        }
        : item
      )

      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      }
    }
  ),

  removeItem: (id) => set((state) => {
    const updateItems = state.items.filter(
      (item) => item.product.id !== id 
    )

    return {
      items: updateItems,
      total: calculateTotal(updateItems)
    }
  }),

  clear: () => set({
      items: [],
      total: 0,
      count: 0
    })

}))
