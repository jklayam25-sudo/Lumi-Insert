import pool from '../Infrastructures/database/pool';

export async function searchAuthByCookie(token: string) {
  return await pool.authToken.findMany({
    where: {
      token: token,
    },
  });
}
