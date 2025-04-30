export enum StatusOrder {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export class Order {
  orderId?: number;
  total: number;
  status: StatusOrder;
  createdAt: Date;

  constructor(
    total: number,
    status: StatusOrder = StatusOrder.PENDING,
    createdAt: Date = new Date(),
    orderId?: number, 
  ) {
    this.orderId = orderId;
    this.total = total;
    this.status = status;
    this.createdAt = createdAt;
  }
}
