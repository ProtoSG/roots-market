import { ReactNode } from "react";
import { useQuery } from "../hooks/useQuery";
import { Product, ProductFilter } from "../models/product.model";
import { getProductsRanking, getProductsRankingByArtisan, getProductsRequest } from "../api/products";
import { ProductContext } from "./product.context";
import { UseFilterStore } from "../stores/filterStore";
import { useArtisanStore } from "../stores/itemStore";

export const ProductProvider = ({children}: {children: ReactNode}) => {
  const { page, categoryFilter, artisanFilter, rangeFilter } = UseFilterStore();
  const { item } = useArtisanStore()

  const key = JSON.stringify({
    resource: "products",
    page,
    categoryId: categoryFilter?.id,
    artisanId: artisanFilter?.id,
    minPrice: rangeFilter?.[0],
    maxPrice: rangeFilter?.[1],
  });

  const {data: products} = useQuery<ProductFilter>({
    fn: () => getProductsRequest({
      page,
      limit: 9,                       
      categoryID: categoryFilter?.id,
      artisanID: artisanFilter?.id,
      minPrice: rangeFilter?.[0],
      maxPrice: rangeFilter?.[1],
    }),
    key
  })

  const {data: productsRanking} = useQuery<Product[]>({
    fn: () => getProductsRanking(),
    key: 'products-ranking'
  })

  const {data: productsRankingByArtisan} = useQuery<Product[]>({
    fn: () => getProductsRankingByArtisan(item ? item.id : 0),
    key: `products-ranking-by-artisan-${item?.id}`
  })

  return (
  <ProductContext.Provider
      value={{
        products,
        productsRanking,
        productsRankingByArtisan,
      }}
  >
    {children}
  </ProductContext.Provider>
  )
}
