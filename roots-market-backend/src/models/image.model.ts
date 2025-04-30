export class Image {
  imageId?: number;
  productId: number;
  imageUrl: string;

  constructor(productId: number, imageUrl: string, imageId?: number) {
    this.imageId = imageId;
    this.productId = productId;
    this.imageUrl = imageUrl;
  }
}
