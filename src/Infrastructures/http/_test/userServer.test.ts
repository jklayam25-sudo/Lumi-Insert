import { describe, it, expect, afterAll, beforeAll } from 'bun:test';
import createServer from '../createServer';
import { container } from '../../container';
import { clearUserDB, searchUserByUsername } from '../../../testHelper/userTableHelper';

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
  await clearUserDB();
});

describe('/user route ', () => {
  it('registering should be return success status when POST /user', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        username: 'lumidev123422',
        password: 'lumidev123',
        fullname: 'Lumi Insert',
      }),
    });
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({
      data: 'Success Registering User',
    });
  });

  it('should be return error 400 status when POST /user with already taken username', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        username: 'lumidev123422',
        password: 'lumidev123',
        fullname: 'Lumi Insert',
      }),
    });
    const response = await res.json();
    expect(res.status).toBe(400);
    expect(response.error).toEqual('Username is not available');
  });

  it('should be return error 400 status when POST /user with bad payload', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        username: 'lumidev1234',
        password: 'lumidev123',
      }),
    });
    const response = await res.json();
    expect(res.status).toBe(400);
    expect(response.error).toEqual('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should be return error 400 status when POST /user with bad payload', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        username: 'lumidev1234',
        password: 'lumidev123',
        fullname: 123,
      }),
    });
    const response = await res.json();
    expect(res.status).toBe(400);
    expect(response.error).toEqual('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('updating should be return success status when PUT /users/{user_id}', async () => {
    const { id } = await searchUserByUsername('lumidev123422');

    const res = await app.request(`/users/${id}`, {
      method: 'PUT',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        fullname: 'sU BERUBAH',
        role: 'OWNER',
      }),
    });

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({
      data: 'Success Updating User',
    });

    const { fullname } = await searchUserByUsername('lumidev123422');
    expect(fullname).toBe('sU BERUBAH');
  });

  it('updating should be return error status when PUT /users/{user_id} with wrong payload', async () => {
    const { id } = await searchUserByUsername('lumidev123422');

    const res = await app.request(`/users/${id}`, {
      method: 'PUT',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        fullname: true,
        role: 'OWNER',
      }),
    });
    const response = await res.json();
    expect(res.status).toBe(400);
    expect(response.error).toEqual('USER_UPDATE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('get should be return array of user when GET /users', async () => {
    await app.request('/users', {
      method: 'POST',
      headers: {
        cookie: AllToken[0],
      },
      body: JSON.stringify({
        username: 'initumbal',
        password: 'tumbal',
        fullname: 'Lumi tumbal',
      }),
    });

    const res = await app.request(`/users`, {
      method: 'GET',
      headers: {
        cookie: AllToken[0],
      },
    });
    const jeson = await res.json();
    console.log(jeson);
    expect(res.status).toBe(200);
    expect(jeson.data).toBeArrayOfSize(3);
    expect(jeson.data[1]).toContainAllKeys(['id', 'username', 'fullname', 'role']);
  });

  it('should return success data when DELETE /users/{useR_id} with correct requirement', async () => {
    const { id } = await searchUserByUsername('initumbal');
    const res = await app.request(`/users/${id}`, {
      method: 'DELETE',
      headers: {
        cookie: AllToken[0],
      },
    });
    const newData = await app.request(`/users`, {
      method: 'GET',
      headers: {
        cookie: AllToken[0],
      },
    });

    expect(res.status).toBe(203);
    expect(await res.json()).toEqual({
      data: 'Success Deleting User',
    });
    const { data } = await newData.json();
    expect(data).toBeArrayOfSize(2);
    expect(data[1]).toContainAllKeys(['id', 'username', 'fullname', 'role']);
  });
});
