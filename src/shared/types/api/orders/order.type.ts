import type { Address } from 'src/shared/types/api/address/address.type';
import type { OrderItem } from './orderItem.type';

export interface Order {
  createdAt: string;
  id: string;
  items: OrderItem[];
  paymentMethod: string;
  shippingAddress?: Address;
  shopOwnerId: string;
  status: string;
  totalAmount: number;
  updatedAt: string;
  userId: string;
}
