export class Product {
  productId?: number;
  name: string;
  story: string;
  price: number;
  stock: number;
  artisanId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    story: string,
    price: number,
    stock: number,
    artisanId: number,
    categoryId: number,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    productId?: number,
  ) {
    this.productId = productId;
    this.name = name;
    this.story = story;
    this.price = price;
    this.stock = stock;
    this.artisanId = artisanId;
    this.categoryId = categoryId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
