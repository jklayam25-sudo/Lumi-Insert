import { Context } from 'hono';
import { containerPayload } from '../../../Infrastructures/container';
import InvariantError from '../../../Commons/errorHandling/InvariantError';

const productHandler = ({
  addProductUseCase,
  getProductUseCase,
  updateProductUseCase,
  deleteProductUseCase,
  getProductByParamsUseCase,
}: containerPayload) => ({
  addProduct: async (c: Context) => {
    const status = await addProductUseCase.execute(await c.req.json());
    return c.json({ data: status }, 201);
  },

  getProduct: async (c: Context) => {
    const status = await getProductUseCase.execute();
    return c.json({ data: status }, 200);
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
});

export default productHandler;
