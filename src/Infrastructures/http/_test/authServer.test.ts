import { describe, it, expect } from 'bun:test';
import createServer from '../createServer';
import { container } from '../../container';
import { searchAuthByCookie } from '../../../testHelper/authTableHelper';

const app = await createServer(container);

describe('/auth route ', () => {
  it('should be return success status when POST /auth with valid credentials', async () => {
    const res = await app.request('/authentications', {
      method: 'POST',
      body: JSON.stringify({
        username: 'SUPERADMIN',
        password: 'SUPERADMIN',
      }),
    });

    expect(res.status).toBe(200);
    expect(res.headers.getSetCookie()).toBeArray();
    expect(await res.json()).toEqual({
      success: 'true',
    });
  });

  it('should be return authentication fail when POST /auth with invalid credentials', async () => {
    const res = await app.request('/authentications', {
      method: 'POST',
      body: JSON.stringify({
        username: 'SUPERADMIN',
        password: 'SUPERADMIN123',
      }),
    });

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({
      success: 'false',
      error: 'Wrong Credentials, try again!',
    });
  });

  it('should delete cookies in db & client when DELETE /auth ', async () => {
    const cookie = await app.request('/authentications', {
      method: 'POST',
      body: JSON.stringify({
        username: 'SUPERADMIN',
        password: 'SUPERADMIN',
      }),
    });

    const refreshToken = cookie.headers.getSetCookie().map((c) => c.split(';')[0]);
    const AllToken = refreshToken.join('; ');

    const res = await app.request('/authentications', {
      method: 'DELETE',
      headers: {
        cookie: AllToken,
      },
    });

    expect(res.status).toBe(203);
    expect(await res.json()).toEqual({
      success: 'true',
    });
    expect(await searchAuthByCookie(refreshToken[1].split('=')[1])).toBeEmpty();
  });
});
