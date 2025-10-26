import pool from '../Infrastructures/database/pool';

export async function clearTrxDB() {
  await pool.transaction.deleteMany({});
}

export async function searchTrx(transaction_id: string) {
  return await pool.transaction.findFirst({
    where: {
      transaction_id,
    },
  });
}

export async function searchAllTrx() {
  return await pool.transaction.findMany({
    orderBy: { transaction_date: 'asc' },
  });
}

export async function searchTrxItem(id: string) {
  return await pool.transactionItems.findFirst({
    where: {
      transaction_id: id,
    },
  });
}
