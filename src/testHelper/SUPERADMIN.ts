/* eslint-disable @typescript-eslint/no-unused-vars */
import pool from '../Infrastructures/database/pool';
import PasswordHasher from '../Infrastructures/security/PasswordHasher';
async function SadminMaker() {
  const hasher = new PasswordHasher();
  const hashPassword = await hasher.hash('SUPERADMIN');

  await pool.user.create({
    data: {
      id: 'SuperAdmin-666',
      username: 'SUPERADMIN',
      password: hashPassword,
      fullname: 'SUPERADMIN JKL',
      role: 'OWNER',
    },
  });
}

async function CustomerMaker() {
  await pool.customer.create({
    data: {
      customer_id: 'cust-000',
      customer_name: 'PUBLIC',
      customer_contact: 'Onsite',
      customer_address: 'Onsite',
    },
  });
}

CustomerMaker();
