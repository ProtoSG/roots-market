import { Product, ProductResponseInfo } from "../models/product.model";

export const productAdapter = (product: ProductResponseInfo): Product => ({
  id: product.productId,
  name: product.name,
  story: product.story,
  price: product.price,
  stock: product.stock,
  categoryId: product.categoryId,
  souldCount: product.soldCount,
  artisanId: product.artisanId,
  artisanName: product.artisanName,
  tags: product.tags,
  images: product.images,
})
