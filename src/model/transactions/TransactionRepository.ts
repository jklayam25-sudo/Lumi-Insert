/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DetailTransaction,
  TransactionRegisteredPayload,
  TransactionRegisterPayload,
} from './type/TransactionType';

export default class TransactionRepository {
  async addTransaction(TransactionRegister: TransactionRegisterPayload): Promise<string> {
    throw new Error('TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllTransaction(id: string | undefined, limit: number): Promise<TransactionRegisteredPayload[]> {
    throw new Error('TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getTotalRows(): Promise<number> {
    throw new Error('TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }


  async getTransactionById(transaction_id: string): Promise<DetailTransaction> {
    throw new Error('TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async isTransactionValid(transaction_id: string): Promise<void> {
    throw new Error('TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  // async updateProduct(product_id: string, edited_product: ProductRegisterPayload):Promise<ProductRegisterPayload> {
  //   throw new Error('TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  // }

  async deleteTransaction(transaction_id: string): Promise<TransactionRegisteredPayload> {
    throw new Error('TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}
