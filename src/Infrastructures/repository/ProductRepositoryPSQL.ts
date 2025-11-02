import { PoolType } from '../database/pool';
import ProductRepository from '../../model/products/ProductRepository';
import { ProductRegisterPayload, ProductStockResponse } from '../../model/products/type/productType';
import InvariantError from '../../Commons/errorHandling/InvariantError';
import ProductRegister from '../../model/products/entities/ProductRegister';
import { DetailItems } from '../../model/transactions/type/TransactionType';
import { ItemRegisterPayload } from '../../model/transitems/type/ItemType';

class ProductRepositoryPSQL extends ProductRepository {
  private pool: PoolType;
  constructor(pool: PoolType) {
    super();
    this.pool = pool;
  }

  async addProduct(Product: ProductRegisterPayload): Promise<ProductRegisterPayload> {
    const result = await this.pool.product.create({
      data: Product,
    });
    const returned = new ProductRegister(result);
    return returned;
  }

  async getAllProduct(product_id: string | undefined, limit: number): Promise<ProductRegisterPayload[]> {
    const result = await this.pool.product.findMany({
      take: limit,
      ...(product_id && {
        cursor: { product_id },
        skip: 1,
      }),
      select: {
        product_id: true,
        product_name: true,
        product_quantity: true,
        product_price: true,
      },
      orderBy: {
        product_last_stock: "desc"
      }
    });
    return result;
  }

  async getProductByName(product_name: string): Promise<ProductRegisterPayload[]> {
    const result = await this.pool.product.findMany({
      where: {
        product_name: {
          contains: product_name,
          mode: 'insensitive',
        },
      },
      select: {
        product_id: true,
        product_name: true,
        product_quantity: true,
        product_price: true,
      },
    });
    return result;
  }

  async updateProduct(
    product_id: string,
    edited_product: ProductRegisterPayload
  ): Promise<ProductRegisterPayload> {
    const result = await this.pool.product.update({
      where: {
        product_id,
      },
      data: edited_product,
    });
    return result;
  }

  async addProductQuantity(product_id: string, quantity: number): Promise<ProductRegisterPayload> {
    const result = await this.pool.product.update({
      where: {
        product_id,
      },
      data: {
        product_quantity: { increment: quantity },
      },
    });
    return result;
  }

  async BulkAddProductQuantity(arrayOfProducts: DetailItems[]): Promise<void> {
    await this.pool.$transaction(async (tx) => {
      for (const item of arrayOfProducts) {
        tx.product.update({
          where: {
            product_id: item.product_id,
          },
          data: {
            product_quantity: { increment: item.product_quantity },
          },
        });
      }
    });
  }

  async deleteProduct(product_id: string): Promise<void> {
    try {
      await this.pool.product.delete({
        where: {
          product_id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InvariantError('Error from Internal, contact developer!');
    }
  }

  async duplicateChecker(product_id: string, product_name: string): Promise<boolean> {
    const result = await this.pool.product.findFirst({
      where: {
        OR: [{ product_id }, { product_name }],
      },
    });
    if (result) throw new InvariantError('Duplicated data! Try to search first.');
    return true;
  }

  async getProductById(product_id: string): Promise<ProductRegisterPayload> {
    const result = await this.pool.product.findUnique({
      where: {
        product_id,
      },
      select: {
        product_id: true,
        product_name: true,
        product_quantity: true,
        product_price: true,
      },
    });

    if (!result) throw new InvariantError('Product id is not found!');
    return result;
  }

  async checkStockAvailability(transaction_items: ItemRegisterPayload[]): Promise<void> {
    await this.pool.$transaction(async (tx) => {
      for (const item of transaction_items) {
        const stock = await tx.product.findFirst({
          where: {
            product_id: item.product_id,
          },
          select: { product_quantity: true },
        });

        if (!stock || stock.product_quantity < item.product_quantity)
          throw new InvariantError('Stock is unavailable');
      }
    });
  }

  async getProductStock(product_id: string): Promise<ProductStockResponse> {
    const result = await this.pool.product.findUnique({
      where: {
        product_id,
      },
      select: {
        product_quantity: true,
      },
    });

    if (!result) throw new InvariantError('Product id is not found!');
    return result;
  }

  async getProductRows(): Promise<number> {
    const result = await this.pool.product.count();
    return result;
  }
}

export default ProductRepositoryPSQL;
