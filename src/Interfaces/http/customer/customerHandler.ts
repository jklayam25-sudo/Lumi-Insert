import { Context } from 'hono';
import { containerPayload } from '../../../Infrastructures/container';
import InvariantError from '../../../Commons/errorHandling/InvariantError';

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
    const cursor = c.req.query('last');
    const limit = Number(c.req.query('limit') ?? 5);
    if(cursor){
      const status = await getCustomerUseCase.execute(cursor === 'first'? undefined: cursor, limit, '');
      return c.json({ data: status }, 200); 
    }
    throw new InvariantError('Bad query: ?last={customer_id} is missing!');
  },
  getSuspendedCustomer: async (c: Context) => {
    const cursor = c.req.query('last');
    const limit = Number(c.req.query('limit') ?? 5);
    if(cursor){
      const status = await getCustomerUseCase.execute(cursor === 'first'? undefined: cursor, limit, 'suspended');
      return c.json({ data: status }, 200); 
    }
    throw new InvariantError('Bad query: ?last={customer_id} is missing!');
  },
  getNameByQuery: async (c: Context) => {
    const query = c.req.query('name');
    if (!query) return c.json({ data: [] }, 200);
    const result = await getCustomerNameUseCase.execute(query);
    return c.json({ data: result }, 200);
  },
});

export default CustomerHandler;
