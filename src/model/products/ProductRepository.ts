/* eslint-disable @typescript-eslint/no-unused-vars */
import { DetailItems } from '../transactions/type/TransactionType';
import { ItemRegisterPayload } from '../transitems/type/ItemType';
import { ProductRegisterPayload, ProductStockResponse } from './type/productType';

export default class ProductRepository {
  async addProduct(ProductRegister: ProductRegisterPayload): Promise<ProductRegisterPayload> {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllProduct(product_id: string | undefined, limit: number): Promise<ProductRegisterPayload[]> {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getProductByName(product_name: string): Promise<ProductRegisterPayload[]> {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateProduct(
    product_id: string,
    edited_product: ProductRegisterPayload
  ): Promise<ProductRegisterPayload> {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async addProductQuantity(product_id: string, quantity: number): Promise<ProductRegisterPayload> {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async BulkAddProductQuantity(arrayOfProducts: DetailItems[]): Promise<void> {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteProduct(product_id: string): Promise<void> {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async duplicateChecker(product_id: string, product_name: string): Promise<boolean> {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getProductById(product_id: string): Promise<ProductRegisterPayload> {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkStockAvailability(transaction_items: ItemRegisterPayload[]): Promise<void> {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getProductStock(product_id: string): Promise<ProductStockResponse> {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getProductRows(): Promise<number> {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}
