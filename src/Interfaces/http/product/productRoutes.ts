import { Hono } from 'hono';
import ProductHandler from './productHandler';
import { containerPayload } from '../../../Infrastructures/container';

const productRoutes = (container: containerPayload) => {
  const user = new Hono();
  const handler = ProductHandler(container);

  user.post('/', container.adminAuth, container.superAdminAuth, handler.addProduct);
  user.get('/', handler.getProduct);
  user.get('/search', container.adminAuth, container.searchLimiter, handler.getProductByParams);
  user.put('/:product_id', container.adminAuth, container.superAdminAuth, handler.updateProduct);
  user.delete('/:product_id', container.adminAuth, container.superAdminAuth, handler.deleteProduct);
  return user;
};

export default productRoutes;
