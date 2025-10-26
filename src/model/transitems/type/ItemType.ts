export type ItemRegisterPayload = {
  product_id: string;
  product_name: string;
  product_price: number;
  product_quantity: number;
};

export type ItemRegisterFinal = {
  refTransaction_id: string;
};

export type ItemProductIdPrice = {
  product_id: string;
  product_price: number;
};

export type ItemRevisionResponse = {
  refTransaction_id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_quantity: number;
};

export type ItemRevisionPayload = {
  product_id: string;
  product_quantity: number;
};

export type ItemRevisionProductPayload = {
  product_id: string;
  added_quantity: number;
  product_price: number;
};

export type ItemRevisionTrxItemPayload = {
  refTransaction_id: string;
  revise_quantity: number;
};
