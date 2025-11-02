import { Context } from 'hono';
import { containerPayload } from '../../../Infrastructures/container';
import InvariantError from '../../../Commons/errorHandling/InvariantError';

const productHandler = ({
  addProductUseCase,
  getProductUseCase,
  updateProductUseCase,
  deleteProductUseCase,
  getProductByParamsUseCase,
  getProductStockUseCase
}: containerPayload) => ({
  addProduct: async (c: Context) => {
    const status = await addProductUseCase.execute(await c.req.json());
    return c.json({ data: status }, 201);
  },

  getProduct: async (c: Context) => {
    const cursor = c.req.query('last');
    const limit = Number(c.req.query('limit') ?? 5);
    if(cursor){
      const status = await getProductUseCase.execute(cursor === 'first'? undefined: cursor, limit);
      return c.json({ data: status }, 200); 
    }
    throw new InvariantError('Bad query: ?last={product_id} is missing!');
  },
  updateProduct: async (c: Context) => {
    const { product_id } = c.req.param();
    const status = await updateProductUseCase.execute(product_id, await c.req.json());
    return c.json({ data: status }, 200);
  },
  deleteProduct: async (c: Context) => {
    const { product_id } = c.req.param();
    const status = await deleteProductUseCase.execute(product_id);
    return c.json({ data: status }, 203);
  },
  getProductByParams: async (c: Context) => {
    const product_name = c.req.query('keyword');
    if (!product_name) throw new InvariantError('Bad query: ?keyword={product name} is missing!');
    const status = await getProductByParamsUseCase.execute(product_name);
    return c.json({ data: status }, 200);
  },
  getProductStock: async (c: Context) => {
    const { product_id } = c.req.param();
    const status = await getProductStockUseCase.execute(product_id);
    return c.json({ data: status }, 200);
  }
});

export default productHandler;
