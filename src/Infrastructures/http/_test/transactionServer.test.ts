import { describe, it, expect, afterAll, beforeAll } from 'bun:test';
import createServer from '../createServer';
import { container } from '../../container';
import { clearTrxDB, searchAllTrx, searchTrx } from '../../../testHelper/transactionTableHelper';
import { addProduct, clearProductDB, searchProduct } from '../../../testHelper/productTableHelper';
import { clearCustomerDB, createCustomer } from '../../../testHelper/customerTableHelper';

const app = await createServer(container);
let AllToken: string[];
let TrxId: string;
beforeAll(async () => {
  await createCustomer('CV. BINTANG PERKASA');
  await createCustomer('CV. BINTANG PERKASA 2');
  await createCustomer('CV. BINTANG PERKASA 3');

  const cookie = await app.request('/authentications', {
    method: 'POST',
    body: JSON.stringify({
      username: 'SUPERADMIN',
      password: 'SUPERADMIN',
    }),
  });

  AllToken = cookie.headers.getSetCookie().map((c) => c.split(';')[0]);

  const res = await app.request('/transactions', {
    method: 'POST',
    headers: {
      cookie: AllToken[0],
    },
    body: JSON.stringify({
      transaction_customer_name: 'CV. BINTANG PERKASA',
    }),
  });

  const { data } = await res.json();
  TrxId = data.transaction_id;

  await addProduct('sbn-999', 'Sabun Gay Lifeboti', 35, 15000);
  await addProduct('sbn-666', 'Sabun Meki Lifeboti', 10, 12000);
});

afterAll(async () => {
  await clearProductDB();
  await clearTrxDB();
  await clearCustomerDB();
});

describe('/transactions route ', () => {
  it('adding new transactions should be return success status when POST /transactions with valid requirement', async () => {
    const res = await app.request('/transactions', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        transaction_customer_name: 'CV. BINTANG PERKASA 2',
      }),
    });

    const { data } = await res.json();
    expect(res.status).toBe(201);
    expect(data.transaction_id).toBeDefined();

    const search = await searchTrx(data.transaction_id);
    if (!search) throw new Error('');
    expect(search.transaction_customer_name).toBe('CV. BINTANG PERKASA 2');
  });

  it('getting all trx should be return success status when GET /transactions', async () => {
    const res = await app.request('/transactions', {
      method: 'GET',
      headers: {
        cookie: AllToken[0],
      },
    });

    const { data } = await res.json();
    expect(res.status).toBe(200);
    expect(data).toBeArray();
    expect(data[0]).toContainAllKeys([
      'transaction_id',
      'transaction_customer_name',
      'transaction_date',
      'transaction_status',
      'transaction_deliver',
      'transaction_handler',
      'transaction_total',
    ]);
    console.log(data);
  });

  it('getting detail trx should be return success status when GET /transactions/${TrxId}', async () => {
    const res = await app.request(`/transactions/${TrxId}`, {
      method: 'GET',
      headers: {
        cookie: AllToken[0],
      },
    });

    const { data } = await res.json();
    expect(res.status).toBe(200);
    expect(data.transaction_items).toBeArray();
    console.log(data);
  });

  it('deleting trx should be return success status when DELETE /transactions/${TrxId}', async () => {
    const res = await app.request(`/transactions/${TrxId}`, {
      method: 'DELETE',
      headers: {
        cookie: AllToken[0],
      },
    });

    const { data } = await res.json();
    expect(res.status).toBe(200);
    expect(data.transaction_id).toBe(TrxId);

    const allTrx = await searchAllTrx();
    expect(allTrx).toHaveLength(2);
    expect(allTrx[1].transaction_customer_name).toBe('CV. BINTANG PERKASA');
    expect(allTrx[1].transaction_status).toBe('CANCELLED');
    expect(allTrx[0].transaction_status).toBe('UNPAID');
    console.table(allTrx);
  });

  it('deleting trx should be return error status when DELETE /transactions/${TrxId}', async () => {
    const res = await app.request(`/transactions/123`, {
      method: 'DELETE',
      headers: {
        cookie: AllToken[0],
      },
    });

    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toBe('Transaction is not valid');
    expect(data.success).toBe('false');
  });

  it('adding items should be return success status when POST /transactions/:id/items with valid requirement', async () => {
    const setup = await app.request(`/transactions`, {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        transaction_customer_name: 'CV. BINTANG PERKASA 3',
      }),
    });

    const { data: data1 } = await setup.json();

    const res = await app.request(`/transactions/${data1.transaction_id}/items`, {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        transaction_items: [
          {
            product_id: 'sbn-999',
            product_name: 'Sabun Gay Lifeboti',
            product_quantity: 2,
            product_price: 15000,
          },
          {
            product_id: 'sbn-666',
            product_name: 'Sabun Meki Lifeboti',
            product_quantity: 9,
            product_price: 12000,
          },
        ],
      }),
    });

    expect(res.status).toBe(201);
    const { data: data2 } = await res.json();
    expect(data2).toHaveLength(2);
    expect(data2[0]).toEqual({
      refTransaction_id: data1.transaction_id + 'sbn-999',
    });
    expect(data2[1]).toEqual({
      refTransaction_id: data1.transaction_id + 'sbn-666',
    });

    const sbn999 = await searchProduct('sbn-999');
    const sbn666 = await searchProduct('sbn-666');
    const data = await searchTrx(data1.transaction_id);
    if (!data) throw new Error();
    expect(data.transaction_total).toBe(30000 + 9 * 12000);
    expect(sbn999?.product_quantity).toBe(35 - 2);
    expect(sbn666?.product_quantity).toBe(10 - 9);
  });

  it('edit items should be return success status when PUT /transactions/:id/items/:refId with valid requirement', async () => {
    const data = await searchAllTrx();
    const bintangPerkasa3 = data[2].transaction_id;

    const res = await app.request(
      `/transactions/${bintangPerkasa3}/items/${bintangPerkasa3 + 'sbn-999'}`,
      {
        method: 'PUT',
        headers: {
          cookie: AllToken[0],
        },
        body: JSON.stringify({
          transaction_items: {
            product_quantity: 20,
          },
        }),
      }
    );

    const res2 = await app.request(
      `/transactions/${bintangPerkasa3}/items/${bintangPerkasa3 + 'sbn-666'}`,
      {
        method: 'PUT',
        headers: {
          cookie: AllToken[0],
        },
        body: JSON.stringify({
          transaction_items: {
            product_quantity: 5,
          },
        }),
      }
    );

    expect(res.status).toBe(200);
    const { data: resdata } = await res.json();
    expect(resdata).toEqual({
      refTransaction_id: bintangPerkasa3 + 'sbn-999',
      product_id: 'sbn-999',
      product_name: 'Sabun Gay Lifeboti',
      product_quantity: 20,
      product_price: 15000,
      transaction_id: bintangPerkasa3,
    });

    expect(res2.status).toBe(200);
    const { data: resdata2 } = await res2.json();
    expect(resdata2).toEqual({
      refTransaction_id: bintangPerkasa3 + 'sbn-666',
      product_id: 'sbn-666',
      product_name: 'Sabun Meki Lifeboti',
      product_quantity: 5,
      product_price: 12000,
      transaction_id: bintangPerkasa3,
    });

    const sbn999 = await searchProduct('sbn-999');
    const sbn666 = await searchProduct('sbn-666');
    const realDB = await searchTrx(bintangPerkasa3);
    if (!realDB) throw new Error();
    expect(realDB.transaction_total).toBe(30000 + 9 * 12000 + 18 * 15000 - 4 * 12000);
    expect(sbn999?.product_quantity).toBe(35 - 2 - (20 - 2));
    expect(sbn666?.product_quantity).toBe(10 - 9 - (5 - 9));
  });

  it('edit items should be return error status when PUT /transactions/:id/items/:refId with no stock item', async () => {
    const data = await searchAllTrx();
    const bintangPerkasa3 = data[2].transaction_id;

    const res = await app.request(
      `/transactions/${bintangPerkasa3}/items/${bintangPerkasa3 + 'sbn-999'}`,
      {
        method: 'PUT',
        headers: {
          cookie: AllToken[0],
        },
        body: JSON.stringify({
          transaction_items: {
            product_quantity: 19,
          },
        }),
      }
    );

    const res2 = await app.request(
      `/transactions/${bintangPerkasa3}/items/${bintangPerkasa3 + 'sbn-666'}`,
      {
        method: 'PUT',
        headers: {
          cookie: AllToken[0],
        },
        body: JSON.stringify({
          transaction_items: {
            product_quantity: 11,
          },
        }),
      }
    );

    expect(res.status).toBe(200);
    const { data: resdata } = await res.json();
    expect(resdata).toEqual({
      refTransaction_id: bintangPerkasa3 + 'sbn-999',
      product_id: 'sbn-999',
      product_name: 'Sabun Gay Lifeboti',
      product_quantity: 19,
      product_price: 15000,
      transaction_id: bintangPerkasa3,
    });

    expect(res2.status).toBe(400);
    const resdata2 = await res2.json();
    expect(resdata2.success).toBe('false');
    expect(resdata2.error).toBe('Stock is unavailable!');
    const sbn666 = await searchProduct('sbn-666');
    expect(sbn666?.product_quantity).toBe(10 - 9 - (5 - 9));
  });

  it('delete items should be return success status when DELETE /transactions/:id/items/:refId', async () => {
    const data = await searchAllTrx();
    const bintangPerkasa3 = data[2].transaction_id;

    const res = await app.request(
      `/transactions/${bintangPerkasa3}/items/${bintangPerkasa3 + 'sbn-999'}`,
      {
        method: 'DELETE',
        headers: {
          cookie: AllToken[0],
        },
      }
    );

    expect(res.status).toBe(200);
    const { data: resdata } = await res.json();
    expect(resdata).toEqual({
      refTransaction_id: bintangPerkasa3 + 'sbn-999',
      product_id: 'sbn-999',
      product_name: 'Sabun Gay Lifeboti',
      product_quantity: 19,
      product_price: 15000,
      transaction_id: bintangPerkasa3,
    });

    const sbn999 = await searchProduct('sbn-999');
    expect(sbn999?.product_quantity).toBe(35 - 2 - (20 - 2) - (19 - 20) - (0 - 19));
    const realDB = await searchTrx(bintangPerkasa3);
    if (!realDB) throw new Error();
    expect(realDB.transaction_total).toBe(
      30000 + 9 * 12000 + 18 * 15000 - 4 * 12000 - 19 * 15000 - 15000
    );
  });
});
