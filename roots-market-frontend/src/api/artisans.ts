import { artisanAdapter, artisanTestimonyAdapter } from "../adapters/artisan.adapter";
import { Artisan, ArtisanLast, ArtisanLastResponse, ArtisanPagination, ArtisanPaginationResponse, ArtisanResponse } from "../models/artisan.model";
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
