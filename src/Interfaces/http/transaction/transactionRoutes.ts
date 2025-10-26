import { Hono } from 'hono';
import TransactionHandler from './transactionHandler';
import { containerPayload } from '../../../Infrastructures/container';

const transactionRoutes = (container: containerPayload) => {
  const user = new Hono();
  const handler = TransactionHandler(container);

  user.post('/', container.adminAuth, handler.addTransaction);
  user.get('/', container.adminAuth, handler.getTransaction);
  user.get('/:id', container.adminAuth, handler.getDetailTransaction);
  user.delete('/:id', container.adminAuth, handler.deleteTransaction);

  // transaction item route
  user.post('/:id/items', container.adminAuth, handler.addItemTransaction);
  user.put('/:id/items/:refId', container.adminAuth, handler.editItemTransaction);
  user.delete('/:id/items/:refId', container.adminAuth, handler.deleteItemTransaction);
  return user;
};

export default transactionRoutes;
