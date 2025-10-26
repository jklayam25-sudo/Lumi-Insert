import { Hono } from 'hono';
import AuthHandler from './authHandler';
import { containerPayload } from '../../../Infrastructures/container';

const authRoutes = (container: containerPayload) => {
  const user = new Hono();
  const handler = AuthHandler(container);

  user.post('/', handler.loginAuth);
  user.delete('/', handler.deleteAuth);

  return user;
};

export default authRoutes;
