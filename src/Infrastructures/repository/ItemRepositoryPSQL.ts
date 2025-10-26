import { PoolType } from '../database/pool';
import { DetailItems } from '../../model/transactions/type/TransactionType';
import ItemRepository from '../../model/transitems/ItemRepository';
import {
  ItemProductIdPrice,
  ItemRegisterFinal,
  ItemRegisterPayload,
  ItemRevisionProductPayload,
  ItemRevisionResponse,
  ItemRevisionTrxItemPayload,
} from '../../model/transitems/type/ItemType';

class ItemRepositoryPSQL extends ItemRepository {
  private pool: PoolType;
  constructor(pool: PoolType) {
    super();
    this.pool = pool;
  }

  async getItemsByTrxId(transaction_id: string): Promise<DetailItems[]> {
    const result = await this.pool.transactionItems.findMany({
      where: {
        transaction_id,
      },
    });
    return result;
  }

  async addItemsTrx(
    transaction_id: string,
    transaction_items: ItemRegisterPayload[]
  ): Promise<ItemRegisterFinal[]> {
    return await this.pool.$transaction(async (tx) => {
      const result: ItemRegisterFinal[] = [];

      for (const item of transaction_items) {
        const res = await tx.transactionItems.create({
          data: {
            refTransaction_id: transaction_id + item.product_id,
            transaction_id,
            ...item,
          },
          select: {
            refTransaction_id: true,
          },
        });

        await tx.product.update({
          where: {
            product_id: item.product_id,
          },
          data: {
            product_quantity: { decrement: item.product_quantity },
          },
        });

        await tx.transaction.update({
          where: {
            transaction_id,
          },
          data: {
            transaction_total: { increment: item.product_price * item.product_quantity },
          },
        });

        result.push(res);
      }
      return result;
    });
  }

  async getQuantity(refTransaction_id: string): Promise<number> {
    const { product_quantity } = await this.pool.transactionItems.findUniqueOrThrow({
      where: {
        refTransaction_id,
      },
      select: { product_quantity: true },
    });

    return product_quantity;
  }

  async getProductIdPrice(refTransaction_id: string): Promise<ItemProductIdPrice> {
    const data = await this.pool.transactionItems.findUniqueOrThrow({
      where: {
        refTransaction_id,
      },
      select: { product_id: true, product_price: true },
    });

    return data;
  }

  async editItemQuantity(
    TransactionId: string,
    productPayload: ItemRevisionProductPayload,
    trxItemPayload: ItemRevisionTrxItemPayload
  ): Promise<ItemRevisionResponse> {
    return await this.pool.$transaction(async (tx) => {
      await tx.product.update({
        where: {
          product_id: productPayload.product_id,
        },
        data: {
          product_quantity: { increment: productPayload.added_quantity },
        },
      });

      await tx.transaction.update({
        where: {
          transaction_id: TransactionId,
        },
        data: {
          transaction_total: {
            decrement: productPayload.added_quantity * productPayload.product_price,
          },
        },
      });

      const revised = await tx.transactionItems.update({
        where: {
          refTransaction_id: trxItemPayload.refTransaction_id,
        },
        data: {
          product_quantity: trxItemPayload.revise_quantity,
        },
      });

      return revised;
    });
  }

  async deleteItem(
    TransactionId: string,
    productPayload: ItemRevisionProductPayload,
    trxItemPayload: ItemRevisionTrxItemPayload
  ): Promise<ItemRevisionResponse> {
    return await this.pool.$transaction(async (tx) => {
      await tx.product.update({
        where: {
          product_id: productPayload.product_id,
        },
        data: {
          product_quantity: { increment: productPayload.added_quantity },
        },
      });

      await tx.transaction.update({
        where: {
          transaction_id: TransactionId,
        },
        data: {
          transaction_total: {
            decrement: productPayload.added_quantity * productPayload.product_price,
          },
        },
      });

      const deleted = await tx.transactionItems.delete({
        where: {
          refTransaction_id: trxItemPayload.refTransaction_id,
        },
      });

      return deleted;
    });
  }
}

export default ItemRepositoryPSQL;
