import { PoolType } from '../database/pool';
import TransactionRepository from '../../model/transactions/TransactionRepository';
import {
  DetailTransaction,
  TransactionRegisteredPayload,
  TransactionRegisterPayload,
} from '../../model/transactions/type/TransactionType';
import InvariantError from '../../Commons/errorHandling/InvariantError';

class TransactionRepositoryPSQL extends TransactionRepository {
  private pool: PoolType;
  constructor(pool: PoolType) {
    super();
    this.pool = pool;
  }

  async addTransaction(Transaction: TransactionRegisterPayload): Promise<string> {
    const id = `trx-${Bun.randomUUIDv7()}`;
    const result = await this.pool.transaction.create({
      data: {
        transaction_id: id,
        ...Transaction,
      },
    });

    return result.transaction_id;
  }

  async getAllTransaction(id: string, limit: number): Promise<TransactionRegisteredPayload[]> {
    const result = await this.pool.transaction.findMany({
      take: limit,
      ...(id && {
        cursor: { transaction_id: id },
        skip: 1,
      }),
      orderBy: {
        transaction_date: "desc"
      }
    });

    return result;
  }

  async getTotalRows(): Promise<number> {
    const result = await this.pool.transaction.count({});
    return result;
  }

  async getTransactionById(transaction_id: string): Promise<DetailTransaction> {
    const result = await this.pool.transaction.findUnique({
      where: {
        transaction_id,
      },
      include: {
        transaction_items: true,
      },
    });
    if (!result) throw new InvariantError('We couldn`t handle your request');
    return result;
  }

  async isTransactionValid(transaction_id: string): Promise<void> {
    const result = await this.pool.transaction.findUnique({
      where: {
        transaction_id,
      },
      select: {
        transaction_status: true,
      },
    });
    if (!result || result.transaction_status === 'CANCELLED')
      throw new InvariantError('Transaction is not valid');
  }

  async deleteTransaction(transaction_id: string): Promise<TransactionRegisteredPayload> {
    const result = await this.pool.transaction.update({
      where: {
        transaction_id,
      },
      data: {
        transaction_status: 'CANCELLED',
        transaction_total: 0,
      },
    });

    return result;
  }
}

export default TransactionRepositoryPSQL;
