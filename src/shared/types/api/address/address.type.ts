export interface Address {
  id: string;
  city: string;
  district: string;
  name: string;
  phone: string;
  street: string;
  type: 'home' | 'office' | 'other';
  userId: string;
  ward: string;
}
