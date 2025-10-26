import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import createServer from '../createServer';
import { container } from '../../container';
import {
  clearCustomerDB,
  createCustomer,
  searchCustomerById,
} from '../../../testHelper/customerTableHelper';
import { error } from 'console';

const app = await createServer(container);
let AllToken: string[];
let CustomerID: string;

beforeAll(async () => {
  const cookie = await app.request('/authentications', {
    method: 'POST',
    body: JSON.stringify({
      username: 'SUPERADMIN',
      password: 'SUPERADMIN',
    }),
  });

  AllToken = cookie.headers.getSetCookie().map((c) => c.split(';')[0]);
  const { customer_id } = await createCustomer('CV. Testing');
  CustomerID = customer_id;
});

afterAll(async () => {
  await clearCustomerDB();
});

describe('/customers routes', async () => {
  it('should create customer data when /POST customers with valid payload', async () => {
    const result = await app.request('/customers', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        customer_name: 'PT. Bangun Perkasa',
        customer_contact: 'WA 082211231 - Ababil',
        customer_address: 'Komp. Industri Galih II No. 03A',
      }),
    });

    expect(result.status).toBe(201);
    const { data } = await result.json();
    expect(data.customer_status).toBe('ACTIVE');
    expect(data).toContainAllKeys([
      'customer_id',
      'customer_name',
      'customer_contact',
      'customer_address',
      'customer_status',
    ]);
  });

  it('should return error when /POST customers with invalid payload', async () => {
    const result = await app.request('/customers', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        customer_name: 'PT. Bangun Perkasa',
        customer_contact: 'WA 082211231 - Ababil',
      }),
    });

    expect(result.status).toBe(400);
    const data = await result.json();
    expect(data.error).toBe('Bad Request: Payload are not complete!');
    expect(data.success).toBe('false');
  });

  it('should return error when /POST customers with duplicated name', async () => {
    const result = await app.request('/customers', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        customer_name: 'PT. Bangun Perkasa',
        customer_contact: 'WA 082211232 - Ababil',
        customer_address: 'Komp. Industri Galih II No. 02A',
      }),
    });

    expect(result.status).toBe(400);
    const data = await result.json();
    expect(data.error).toBe('Bad Request: Register object already registered in database!');
    expect(data.success).toBe('false');
  });

  // Update routes test >

  it('should update customer data when /PUT customers with valid payload', async () => {
    const assign = await app.request('/customers', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        customer_name: 'PT. Bangun Anerh',
        customer_contact: 'WA 082211231 - Ababil',
        customer_address: 'Komp. Industri Galih II No. 03A',
      }),
    });

    const { data: Anerh } = await assign.json();

    const result = await app.request(`/customers/${Anerh.customer_id}`, {
      method: 'PUT',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        customer_contact: 'WA 066 - Kntl',
        customer_address: 'Komp. Awikwok',
        customer_lat: 1.0241131615456687,
        customer_lng: 104.01244389683742,
      }),
    });

    expect(result.status).toBe(200);
    const { data } = await result.json();
    expect(data).toContainAllKeys([
      'customer_id',
      'customer_name',
      'customer_contact',
      'customer_address',
      'customer_status',
    ]);

    const realDB = await searchCustomerById(Anerh.customer_id);
    expect(realDB?.customer_lat).toBe(1.0241131615456689);
    expect(realDB?.customer_lng).toBe(104.0124438968374);
    expect(realDB?.customer_name).toBe('PT. Bangun Anerh');
    expect(realDB?.customer_contact).toBe('WA 066 - Kntl');
    expect(realDB?.customer_address).toBe('Komp. Awikwok');
  });

  it('should return error when /PUT customers with unknown customer', async () => {
    const result = await app.request(`/customers/cust-gaada`, {
      method: 'PUT',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        customer_contact: 'WA 066 - Kntl',
        customer_address: 'Komp. Awikwok',
        customer_lat: 1.0241131615456687,
        customer_lng: 104.01244389683742,
      }),
    });

    expect(result.status).toBe(400);
    const data = await result.json();
    expect(data.error).toBe('Bad Request: Request Target not found!');
    expect(data.success).toBe('false');
  });

  it('should return error when /PUT customers with none payload', async () => {
    const result = await app.request(`/customers/cust-000`, {
      method: 'PUT',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        customer_contact: '',
      }),
    });

    expect(result.status).toBe(400);
    const data = await result.json();
    expect(data.error).toBe('Bad Request: customer_contact must not empty!');
    expect(data.success).toBe('false');
  });

  it('should return error when /PUT customers with none payload', async () => {
    const result = await app.request(`/customers/cust-000`, {
      method: 'PUT',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({}),
    });

    expect(result.status).toBe(400);
    const data = await result.json();
    expect(data.error).toBe('Bad Request: Request Update should be atleast 1.');
    expect(data.success).toBe('false');
  });

  it('should return active customer data when /GET customers', async () => {
    await app.request(`/customers/${CustomerID}`, {
      method: 'PUT',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        customer_status: 'SUSPENDED',
      }),
    });

    const assign = await app.request('/customers', {
      method: 'GET',
      headers: {
        cookie: AllToken[0],
      },
    });

    const cust = await searchCustomerById(CustomerID);
    if (!cust) throw error('');
    expect(cust.customer_status).toBe('SUSPENDED');

    const { data } = await assign.json();
    expect(data).toBeArrayOfSize(3);
    const isActive = data.every((d) => d.customer_status === 'ACTIVE');
    expect(isActive).toBeTrue();
    console.table(data);
  });

  it('should return inactive customer data when /GET customers', async () => {
    const assign = await app.request('/customers/inactive', {
      method: 'GET',
      headers: {
        cookie: AllToken[0],
      },
    });

    const { data } = await assign.json();
    expect(data).toBeArrayOfSize(1);
    const isActive = data.every((d) => d.customer_status === 'SUSPENDED');
    expect(isActive).toBeTrue();
    expect(data[0].customer_name).toBe('CV. Testing');
  });

  it('get should be return array of customer name when GET /customer/search?name={prudct_name}', async () => {
    const res = await app.request('/customers/search?name=bang', {
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
          customer_name: 'PT. Bangun Anerh',
        },
        {
          customer_name: 'PT. Bangun Perkasa',
        },
      ],
    });
  });

  it('get should be return array of none when GET /customer/search?name=', async () => {
    const res = await app.request('/customers/search?name=', {
      method: 'GET',
      headers: {
        cookie: AllToken[0],
      },
    });

    expect(res.status).toBe(200);
    const jeson = await res.json();
    expect(jeson).toEqual({
      data: [],
    });
  });
});
