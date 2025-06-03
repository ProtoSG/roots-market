import { fetchData, requestJSON } from "./fetchData";

export const getProductsRequest = async () => 
  requestJSON("/prodcut", {
    method: "GET" 
  })

export const createProductRequest = async (product: Produ)

export const getProductsByArtisan =  async() => 
  requestJSON("/product/artisan", {
    method: "GET",
    credentials: "include"
  })


