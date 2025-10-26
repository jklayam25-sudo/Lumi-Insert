import { Hono } from 'hono';
import UserHandler from './userHandler';
import { containerPayload } from '../../../Infrastructures/container';

const userRoutes = (container: containerPayload) => {
  const user = new Hono();
  const handler = UserHandler(container);

  user.post('/', container.adminAuth, container.superAdminAuth, handler.createAccount);
  user.get('/', container.adminAuth, container.superAdminAuth, handler.getAccount);
  user.put('/:userid', container.adminAuth, container.superAdminAuth, handler.updateAccount);
  user.delete('/:userid', container.adminAuth, container.superAdminAuth, handler.deleteAccount);

  return user;
};

export default userRoutes;
