import { Hono } from 'hono';
import { containerPayload } from '../../../Infrastructures/container';
import CustomerHandler from './customerHandler';

const customerRoutes = (container: containerPayload) => {
  const user = new Hono();
  const handler = CustomerHandler(container);

  user.post('/', container.adminAuth, handler.createCustomer);
  user.put('/:id', container.adminAuth, handler.updateCustomer);
  user.get('/', container.adminAuth, handler.getActiveCustomer);
  user.get('/:id/detail', container.adminAuth, handler.getCustomerDetail);
  user.get('/inactive', container.adminAuth, handler.getSuspendedCustomer);
  user.get('/search', container.adminAuth, handler.getNameByQuery);
  return user;
};

export default customerRoutes;
