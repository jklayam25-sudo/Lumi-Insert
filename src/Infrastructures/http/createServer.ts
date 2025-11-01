import { Hono } from 'hono';
import userRoutes from '../../Interfaces/http/user/userRoutes';
import { containerPayload } from '../container';
import InvariantError from '../../Commons/errorHandling/InvariantError';
import { StatusCode } from 'hono/utils/http-status';
import AuthenticationError from '../../Commons/errorHandling/AuthenticationError';
import authRoutes from '../../Interfaces/http/auth/authRoutes';
import productRoutes from '../../Interfaces/http/product/productRoutes';
import transactionRoutes from '../../Interfaces/http/transaction/transactionRoutes';
import customerRoutes from '../../Interfaces/http/customer/customerRoutes';

const createServer = async (container: containerPayload) => {
  const app = new Hono();

  app.route('/users', userRoutes(container));
  app.route('/authentications', authRoutes(container));
  app.route('/products', productRoutes(container));
  app.route('/transactions', transactionRoutes(container));
  app.route('/customers', customerRoutes(container));

  const server = Bun.serve({
    fetch: app.fetch,
    port: 3823,
  });

  console.log('SERVER_CONNECTED', server);

  app.notFound((c) => {
    return c.json({
      error: `${c.req.url} ENDPOINT not valid, try to check docs!`,
      success: 'false'
    }, 404);
  });

  app.onError(async (err, c) => {
    if (err instanceof InvariantError || err instanceof AuthenticationError) {
      c.status(err.ErrCode as StatusCode);
      console.error('Client error', err);
      return c.json({
        error: err.message,
        success: 'false',
      });
    }
    console.error('err123', err);
    return c.json(
      {
        error: err.message,
      },
      500
    );
  });

  return app;
};

export default createServer;
