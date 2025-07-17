import { artisanAdapter, artisanTestimonyAdapter, artisanUpdateAdapter } from "../adapters/artisan.adapter";
import { productAdapter } from "../adapters/product.adapter";
import { Artisan, ArtisanLast, ArtisanLastResponse, ArtisanPagination, ArtisanPaginationResponse, ArtisanResponse, ArtisanUpdate } from "../models/artisan.model";
import { ProductCreate, ProductFilter, ProductResponse } from "../models/product.model";
import { ResponseWritter } from "../models/response.model";
import { BaseSocialNetwork } from "../models/socialNetwork.model";
import { requestJSON } from "./requestJSON"

export const getLastArtisan = async(): Promise<ArtisanLast> => {
  const {status, data} = await requestJSON<ArtisanLastResponse>("/artisans/last", 
    {method: "GET"}
  )

  if (status < 200 || status >= 300) {
    throw new Error(`Failed to fetch last artisan: ${status}`);
  }

  if (data === null) {
    throw new Error("No data received for last artisan");
  }

  return artisanTestimonyAdapter(data);
}

interface FilterProps {
  page?: number 
  limit?: number
}

export const getArtisans = async({
  page,
  limit,
}: FilterProps): Promise<ArtisanPagination> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  const uri = `/artisans?${params.toString()}`

  const {status, data} = await requestJSON<ArtisanPaginationResponse>(uri, 
    {method: "GET"}
  )

  if (status < 200 || status >= 300) {
    throw new Error(`Failed to fetch artisans: ${status}`);
  }


  if (data === null) {
    throw new Error("No data received for artisans");
  }

  const artisans = data.data.map(artisanAdapter)

  const dataAdap = {
    ...data,
    data: artisans
  }

  return dataAdap
}

export const getArtisanInfo = async(): Promise<Artisan> =>{
  const {status, data} = await requestJSON<ArtisanResponse>("/artisans/me", {
    method: "GET",
    credentials: "include",
  })

  if (status < 200 || status >= 300) {
    throw new Error(`Failed to fetch artisan info: ${status}`);
  }


  if (data === null) {
    throw new Error("No data received for artisan info");
  }

  return artisanAdapter(data)
}

export const putArtisanInfo = async(artisan: ArtisanUpdate) => {
  const artisanAdapted = artisanUpdateAdapter(artisan)

  const {status, data} = await requestJSON<ResponseWritter>("/artisans/me", {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(artisanAdapted)
  })

  if (status < 200 || status >= 300) {
    throw new Error(`Failed to fetch artisans: ${status}`);
  }

  if (data === null) {
    throw new Error("No data received for artisans");
  }

  return data
}

export const createSocialNetwork = async (sn: BaseSocialNetwork) => {
  const { status, data } = await requestJSON<ResponseWritter>("/artisans/me/socialNetworks", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(sn)
  })


  if (status < 200 || status >= 300) {
    throw new Error(`Failed to fetch artisans: ${status}`);
  }

  if (data === null) {
    throw new Error("No data received for social network");
  }

  return data
}

export const updateSocialNetwork = async (id: number, sn: BaseSocialNetwork) => {
  const { status, data } = await requestJSON<ResponseWritter>(`/artisans/me/socialNetworks/${id}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({
      "type": sn.type,
      "url": sn.url,
    })
  })

  if (status < 200 || status >= 300) {
    throw new Error(`Failed to fetch artisans: ${status}`);
  }

  if (data === null) {
    throw new Error("No data received for social network");
  }

  return data
}

export const getProductsArtisan = async (): Promise<ProductFilter> => {
  const { status, data }= await requestJSON<ProductResponse>("/artisans/me/products", {
    method: "GET",
    credentials: "include"
  })

  if (status < 200 || status >= 300) {
    throw new Error(`Failed to fetch artisans: ${status}`);
  }

  if (data === null) {
    throw new Error("No data received for social network");
  }

  const products = data.data.map(productAdapter)

  const dataAdap = {
    ...data,
    data: products
  }

  return dataAdap;
}

export const createProduct = async (product: ProductCreate) => {
  const { status, data } = await requestJSON<ResponseWritter>("/artisans/me/products", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(product)
  })

  if (status < 200 || status >= 300) {
    throw new Error(`Failed to fetch artisans: ${status}`);
  }

  if (data === null) {
    throw new Error("No data received for social network");
  }

  return data
}

export const updateProduct = async (id: number, product: ProductCreate) => {
  const { status, data } = await requestJSON<ResponseWritter>(`/artisans/me/products/${id}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(product)
  })

  if (status < 200 || status >= 300) {
    throw new Error(`Failed to update product: ${status}`);
  }

  if (data === null) {
    throw new Error("No data received for product update");
  }

  return data;
}
