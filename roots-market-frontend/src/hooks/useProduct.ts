import { productAdapter } from "../adapters/product.adapter"
import { Product, ProductBack } from "../models/product.model"
import { fetchData } from "../utils/fetchData"
import { useQuery } from "./useQuery"

export const useProduct = (): Product[]=> {
  const data = useQuery<Product>({
    fn: () => fetchData<Product, ProductBack>({
      url: 'product', 
      jsonAdapter: productAdapter
    }), 
    key: 'product'
  })

  return data
}

export const useProductRanking = (): Product[] => {
  const data = useQuery<Product>({
    fn: () => fetchData({
      url: 'product/ranking',
      jsonAdapter: productAdapter
    }),
    key: 'productRanking'
  })

  return data
}
