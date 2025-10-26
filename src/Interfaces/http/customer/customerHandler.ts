import { Context } from 'hono';
import { containerPayload } from '../../../Infrastructures/container';

const CustomerHandler = ({
  addCustomerUseCase,
  updateCustomerUseCase,
  getCustomerUseCase,
  getCustomerNameUseCase,
}: containerPayload) => ({
  createCustomer: async (c: Context) => {
    const status = await addCustomerUseCase.execute(await c.req.json());
    return c.json({ data: status }, 201);
  },
  updateCustomer: async (c: Context) => {
    const { id } = c.req.param();
    const status = await updateCustomerUseCase.execute(id, await c.req.json());
    return c.json({ data: status }, 200);
  },
  getActiveCustomer: async (c: Context) => {
    const result = await getCustomerUseCase.execute('');
    return c.json({ data: result }, 200);
  },
  getSuspendedCustomer: async (c: Context) => {
    const result = await getCustomerUseCase.execute('suspended');
    return c.json({ data: result }, 200);
  },
  getNameByQuery: async (c: Context) => {
    const query = c.req.query('name');
    if (!query) return c.json({ data: [] }, 200);
    const result = await getCustomerNameUseCase.execute(query);
    return c.json({ data: result }, 200);
  },
});

export default CustomerHandler;
