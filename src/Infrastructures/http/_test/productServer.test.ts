import { describe, it, expect, afterAll, beforeAll } from 'bun:test';
import createServer from '../createServer';
import { container } from '../../container';
import { clearProductDB, searchProduct } from '../../../testHelper/productTableHelper';

const app = await createServer(container);
let AllToken: string[];

beforeAll(async () => {
  const cookie = await app.request('/authentications', {
    method: 'POST',
    body: JSON.stringify({
      username: 'SUPERADMIN',
      password: 'SUPERADMIN',
    }),
  });

  AllToken = cookie.headers.getSetCookie().map((c) => c.split(';')[0]);
});

afterAll(async () => {
  await clearProductDB();
});

describe('/products route ', () => {
  it('adding new product should be return success status when POST /products with valid requirement', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        product_id: 'sbn-103',
        product_name: 'Sabun Batang Lifeboti',
        product_quantity: 35,
        product_price: 12000,
      }),
    });

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({
      data: {
        product_id: 'sbn-103',
        product_name: 'Sabun Batang Lifeboti',
        product_quantity: 35,
        product_price: 12000,
      },
    });
  });

  it('should be return error 400 status when POST /products with duplicate data', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        product_id: 'sbn-103',
        product_name: 'Sabun Batang Lifeboti',
        product_quantity: 35,
        product_price: 12000,
      }),
    });

    const response = await res.json();
    expect(res.status).toBe(400);
    expect(response.error).toEqual('Duplicated data! Try to search first.');
  });

  it('should be return error 400 status when POST /products with bad payload', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        product_id: 'sbn-1031',
        product_name: 'Sabun Batang Lifeboti1',
        product_quantity: '35',
        product_price: 12000,
      }),
    });

    const response = await res.json();
    expect(res.status).toBe(400);
    expect(response.error).toEqual('Request Body did not meet data type!');
  });

  it('get should be return array of products when GET /products', async () => {
    await app.request('/products', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        product_id: 'sbn-104',
        product_name: 'Sabun Batang Lifeboti Merah',
        product_quantity: 23,
        product_price: 12300,
      }),
    });

    const res = await app.request('/products', {
      method: 'GET',
    });

    const jeson = await res.json();

    expect(res.status).toBe(200);
    expect(jeson).toEqual({
      data: [
        {
          product_id: 'sbn-103',
          product_name: 'Sabun Batang Lifeboti',
          product_quantity: 35,
          product_price: 12000,
        },
        {
          product_id: 'sbn-104',
          product_name: 'Sabun Batang Lifeboti Merah',
          product_quantity: 23,
          product_price: 12300,
        },
      ],
    });
  });

  it('update should be return error when PUT /products/{id} with duplicate request', async () => {
    const res = await app.request('/products/sbn-104', {
      method: 'PUT',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        product_id: 'sbn-103',
        product_name: 'Sabun Batang Lifeboti Merah1',
        product_quantity: 23,
        product_price: 12300,
      }),
    });

    const jeson = await res.json();

    expect(res.status).toBe(400);
    expect(jeson).toEqual({
      error: 'Duplicated data! Try to search first.',
      success: 'false',
    });
  });

  it('update should be return error when PUT /products/{id} with unregistered product', async () => {
    const res = await app.request('/products/sbn-1041', {
      method: 'PUT',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        product_id: 'sbn-103',
        product_name: 'Sabun Batang Lifeboti Merah1',
        product_quantity: 23,
        product_price: 12300,
      }),
    });

    const jeson = await res.json();

    expect(res.status).toBe(400);
    expect(jeson).toEqual({
      error: 'Product id is not found!',
      success: 'false',
    });
  });

  it('update should be return success when PUT /products/{id} with correct requirement', async () => {
    const res = await app.request('/products/sbn-104', {
      method: 'PUT',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        product_id: 'sbn-105',
        product_name: 'Sabun Batang Lifeboti Biru',
        product_quantity: 21,
        product_price: 12100,
      }),
    });

    const jeson = await res.json();

    expect(res.status).toBe(200);
    expect(jeson.data).toEqual({
      product_id: 'sbn-105',
      product_name: 'Sabun Batang Lifeboti Biru',
      product_quantity: 21,
      product_price: 12100,
    });
  });

  it('delete should be return success when DELETE /products/{id}', async () => {
    const res = await app.request('/products/sbn-105', {
      method: 'DELETE',
      headers: {
        cookie: AllToken[0],
      },
    });

    const jeson = await res.json();

    expect(res.status).toBe(203);
    expect(jeson.data).toBe('Success Deleting Product');
    expect(await searchProduct('sbn-104')).toBeNull();
  });

  it('get should be return array of products when GET /products/{prudct_name}', async () => {
    await app.request('/products', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        product_id: 'sbn-110',
        product_name: 'Sabun Ngocok',
        product_quantity: 1,
        product_price: 120000,
      }),
    });

    const res = await app.request('/products/search?keyword=sabun', {
      method: 'GET',
      headers: {
        cookie: AllToken[0],
      },
    });

    expect(res.status).toBe(200);
    const jeson = await res.json();
    expect(jeson).toEqual({
      data: [
        {
          product_id: 'sbn-103',
          product_name: 'Sabun Batang Lifeboti',
          product_quantity: 35,
          product_price: 12000,
        },
        {
          product_id: 'sbn-110',
          product_name: 'Sabun Ngocok',
          product_quantity: 1,
          product_price: 120000,
        },
      ],
    });
  });

  // it('get should be error if caught limit req', async () => {
  //   const res = await app.request('/products/search?keyword=sabun', {
  //     method: 'GET',
  //     headers: {
  //       cookie: AllToken[0],
  //     },
  //   });

  //   expect(res.status).toBe(429);
  //   console.log('rate limitting', res);
  // });
});
