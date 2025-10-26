import pool from '../Infrastructures/database/pool';

export async function clearProductDB() {
  await pool.product.deleteMany({});
}

export async function searchProduct(product_id: string) {
  return await pool.product.findFirst({
    where: {
      product_id,
    },
  });
}

export async function addProduct(id: string, name: string, quantity: number, price: number) {
  await pool.product.create({
    data: {
      product_id: id,
      product_name: name,
      product_price: price,
      product_quantity: quantity,
    },
  });
}
