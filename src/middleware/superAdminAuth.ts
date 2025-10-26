import AuthenticationError from '../Commons/errorHandling/AuthenticationError';
import { Context, Next } from 'hono';

export const SuperAdminAuth = () => {
  return async (c: Context, next: Next) => {
    const { role } = c.get('identity');
    if (!role) throw new AuthenticationError('Token Invalid!');

    try {
      if (role !== 'OWNER') return c.json({ error: 'Invalid Authorize', success: 'false' }, 401);
      await next();
    } catch (err) {
      console.error(err);
      return c.json({ error: 'Invalid token', success: 'false' }, 403);
    }
  };
};
