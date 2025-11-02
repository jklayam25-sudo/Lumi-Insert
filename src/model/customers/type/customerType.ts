import { TransactionRegisteredPayload } from '../../transactions/type/TransactionType';

export type CustomerUpdatePayload = {
  customer_name?: string;
  customer_contact?: string;
  customer_address?: string;
  customer_status?: 'ACTIVE' | 'SUSPENDED';
  customer_lat?: number;
  customer_lng?: number;
};

export type CustomerRegisterPayload = {
  customer_name: string;
  customer_contact: string;
  customer_address: string;
};

export type CustomerNameResponse = {
  customer_name: string;
};

export type CustomerRegisterResponse = {
  customer_id: string;
  customer_name: string;
  customer_contact: string;
  customer_address: string;
  customer_status: 'ACTIVE' | 'SUSPENDED';
};

export type CustomerDetailResponse = {
  customer_id: string;
  customer_name: string;
  customer_contact: string;
  customer_since: Date;
  customer_address: string;
  customer_status: 'ACTIVE' | 'SUSPENDED';
  customer_lat: number | null;
  customer_lng: number | null;
  transaction: TransactionRegisteredPayload[];
};

export type GetCustomerResponse = { 
  customer_data: CustomerRegisterResponse[],
  total_rows: number,
}
