import pool from '../Infrastructures/database/pool';

export async function clearUserDB() {
  await pool.user.deleteMany({
    where: {
      NOT: {
        username: 'SUPERADMIN',
      },
    },
  });
}

export async function searchUserByUsername(username: string) {
  const result = (await pool.user.findUnique({
    where: {
      username: username,
    },
  })) || { id: '', fullname: '' };
  return result;
}
