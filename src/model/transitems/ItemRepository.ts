/* eslint-disable @typescript-eslint/no-unused-vars */
import { DetailItems } from '../transactions/type/TransactionType';
import {
  ItemProductIdPrice,
  ItemRegisterFinal,
  ItemRegisterPayload,
  ItemRevisionProductPayload,
  ItemRevisionResponse,
  ItemRevisionTrxItemPayload,
} from './type/ItemType';

export default class ItemRepository {
  async addItemsTrx(
    transaction_id: string,
    transaction_items: ItemRegisterPayload[]
  ): Promise<ItemRegisterFinal[]> {
    throw new Error('ITEM_TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getItemsByTrxId(transaction_id: string): Promise<DetailItems[]> {
    throw new Error('TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getQuantity(refTransaction_id: string): Promise<number> {
    throw new Error('TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getProductIdPrice(refTransaction_id: string): Promise<ItemProductIdPrice> {
    throw new Error('TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async editItemQuantity(
    TransactionId: string,
    productPayload: ItemRevisionProductPayload,
    trxItemPayload: ItemRevisionTrxItemPayload
  ): Promise<ItemRevisionResponse> {
    throw new Error('TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteItem(
    TransactionId: string,
    productPayload: ItemRevisionProductPayload,
    trxItemPayload: ItemRevisionTrxItemPayload
  ): Promise<ItemRevisionResponse> {
    throw new Error('TRX_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}
