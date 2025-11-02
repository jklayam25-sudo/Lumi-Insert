import { Context } from 'hono';
import { containerPayload } from '../../../Infrastructures/container';
import InvariantError from '../../../Commons/errorHandling/InvariantError';

const transactionHandler = ({
  addTransactionUseCase,
  getDetailTransactionUseCase,
  getTransactionUseCase,
  deleteTransactionUseCase,
  addItemTransactionUseCase,
  editItemTransactionUseCase,
  deleteItemTransactionUseCase,
}: containerPayload) => ({
  addTransaction: async (c: Context) => {
    const { transaction_customer_name } = await c.req.json();
    const payload = {
      transaction_customer_name,
      transaction_handler: c.get('identity').username,
    };
    const transaction_id = await addTransactionUseCase.execute(payload);
    return c.json({ data: { transaction_id } }, 201);
  },

  getTransaction: async (c: Context) => {
    const cursor = c.req.query('last');
    const limit = Number(c.req.query('limit') ?? 5);
    if(cursor){
      const result = await getTransactionUseCase.execute(cursor === 'first'? undefined: cursor, limit);
      return c.json({ data: result }, 200); 
    }
    throw new InvariantError('Bad query: ?last={transaction_id} is missing!');
  },

  getDetailTransaction: async (c: Context) => {
    const { id } = c.req.param();
    const result = await getDetailTransactionUseCase.execute(id);
    return c.json({ data: result }, 200);
  },

  deleteTransaction: async (c: Context) => {
    const { id } = c.req.param();
    const result = await deleteTransactionUseCase.execute(id);
    return c.json({ data: result }, 200);
  },

  addItemTransaction: async (c: Context) => {
    const { id } = c.req.param();
    const { transaction_items } = await c.req.json();

    const dataArray = await addItemTransactionUseCase.execute(id, transaction_items);
    return c.json({ data: dataArray }, 201);
  },

  editItemTransaction: async (c: Context) => {
    const { id, refId } = c.req.param();
    const { transaction_items } = await c.req.json();

    const result = await editItemTransactionUseCase.execute(
      id,
      refId,
      transaction_items.product_quantity
    );
    return c.json({ data: result }, 200);
  },

  deleteItemTransaction: async (c: Context) => {
    const { id, refId } = c.req.param();

    const result = await deleteItemTransactionUseCase.execute(id, refId);
    return c.json({ data: result }, 200);
  },
});

export default transactionHandler;
