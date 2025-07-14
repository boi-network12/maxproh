export interface Pricing {
  _id: string;
  socialMediaPlatform: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
}