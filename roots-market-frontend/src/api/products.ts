import { productAdapter } from "../adapters/product.adapter";
import { Product, ProductFilter, ProductResponse, ProductResponseInfo } from "../models/product.model";
import { requestJSON } from "./requestJSON";

interface FilterProps {
  page?: number
  limit?: number
  categoryID?: number
  artisanID?: number
  minPrice?: number
  maxPrice?: number
}

export const getProductsRequest = async ({
  page,
  limit,
  categoryID,
  artisanID,
  minPrice,
  maxPrice,
}: FilterProps = {}): Promise<ProductFilter> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (categoryID != null) params.append("categoryId", String(categoryID))
  if (artisanID != null) params.append("artisanId", String(artisanID))
  if (minPrice != null) params.append("minPrice", String(minPrice))
  if (maxPrice != null) params.append("maxPrice", String(maxPrice))

  const uri = `/products?${params.toString()}`

  console.log({uri})

  const {status, data} = await requestJSON<ProductResponse>(uri, {
    method: "GET"
  })

  if (status < 200 || status >= 300) {
    throw new Error(`Failed to fetch products: ${status}`);
  }

  if (!data) {
    throw new Error("No se recibieron datos de productos.");
  }

  const products = data.data.map(productAdapter)

  const dataAdap = {
    ...data,
    data: products
  }

  return dataAdap;
}

export const getProductsRanking = async (): Promise<Product[]> => {
  const {status, data} = await requestJSON<ProductResponseInfo[]>("/products/ranking", {
    method: "GET"
  })
  
  if (status < 200 || status >= 300) {
    throw new Error(`Failed to fetch products: ${status}`);
  }

  return (data ?? []).map(productAdapter);
}

export const getProductsRankingByArtisan = async (id: number) => {
  const {status, data} = await requestJSON<ProductResponseInfo[]>(`/products/ranking/artisan/${id}`, {
    method: "GET"
  })

  if (status < 200 || status >= 300) {
    throw new Error(`Failed to fetch products: ${status}`);
  }

  return (data ?? []).map(productAdapter);
}
