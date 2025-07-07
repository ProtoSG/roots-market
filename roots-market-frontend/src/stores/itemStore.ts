import { create } from "zustand"
import { Product } from "../models/product.model"
import { Artisan } from "../models/artisan.model"
import { BaseSocialNetwork, SocialNetwork } from "../models/socialNetwork.model"

interface ItemState<T> {
  item: T | null 
  setItem: (item: T) => void
}

const createItemStore = <T>() => create<ItemState<T>>((set) => ({
  item: null,
  setItem: (item: T)=> set(() => ({item}))
}))

export const useProductStore = createItemStore<Product>()
export const useArtisanStore = createItemStore<Artisan>()
export const useArtisanUpdateStore = createItemStore<Artisan>()
export const useSNUpdateStore = createItemStore<SocialNetwork>()
