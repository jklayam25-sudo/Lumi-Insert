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

export type ProductStockResponse = {
  product_quantity: number;
};


export type GetProductResponse = {
  product_data: ProductRegisterPayload[];
  total_rows: number;
}