export type ProductRegisterPayload = {
  product_id: string;
  product_name: string;
  product_quantity: number;
  product_price: number;
};

export type ProductRegisteredPayload = {
  product_id: string;
  product_name: string;
};
