export class OrderDetail {
  orderDetailId?: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;

  constructor(
    orderId: number,
    productId: number,
    quantity: number,
    price: number,
    orderDetailId?: number,
  ) {
    this.orderDetailId = orderDetailId;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}
