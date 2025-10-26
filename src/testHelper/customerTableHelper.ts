import pool from '../Infrastructures/database/pool';

export async function clearCustomerDB() {
  await pool.customer.deleteMany({
    where: {
      NOT: {
        customer_name: 'PUBLIC',
      },
    },
  });
}

export async function createCustomer(customer_name: string) {
  const random = Bun.randomUUIDv7();
  const mockup = {
    customer_id: `cust-${random}`,
    customer_address: `Jl. ${random}`,
    customer_contact: `WA ${random}`,
  };

  return await pool.customer.create({
    data: {
      customer_name,
      ...mockup,
    },
  });
}

export async function searchCustomerById(customer_id: string) {
  const result = await pool.customer.findUnique({
    where: {
      customer_id,
    },
  });
  return result;
}
