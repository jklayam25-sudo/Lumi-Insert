import { getCookie } from 'hono/cookie';
import AuthenticationError from '../Commons/errorHandling/AuthenticationError';
import { Context, Next } from 'hono';
import TokenManager from '../application/security/TokenManager';

type adminAuthDepend = {
  authenticationTokenManager: TokenManager;
};

export const AdminAuth = ({ authenticationTokenManager }: adminAuthDepend) => {
  return async (c: Context, next: Next) => {
    const token = getCookie(c, 'LUMIALBCORS') as string;
    if (!token) throw new AuthenticationError('Token Invalid!');

    try {
      const identifier = await authenticationTokenManager.verifyAccessToken(token);
      c.set('identity', identifier);
      await next();
    } catch (err) {
      console.error(err);
      return c.json({ error: 'Invalid token', success: 'false' }, 403);
    }
  };
};
