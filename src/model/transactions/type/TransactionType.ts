export type TransactionRegisterPayload = {
  transaction_customer_name: string;
  transaction_handler: string;
};

export type TransactionRegisteredPayload = {
  transaction_id: string;
  transaction_customer_name: string;
  transaction_date: Date;
  transaction_status: 'UNPAID' | 'PAID' | 'CANCELLED';
  transaction_deliver: 'PENDING' | 'READY' | 'FINISH' | 'CANCELLED';
  transaction_handler: string;
  transaction_total: number;
};

export interface DetailTransaction extends TransactionRegisteredPayload {
  transaction_items: DetailItems[];
}

export type DetailItems = {
  transaction_id: string;
  product_id: string;
  product_name: string;
  product_quantity: number;
  product_price: number;
};

export type GetTransactionResponse = {
  transaction_data: TransactionRegisteredPayload[];
  total_rows: number;
}
