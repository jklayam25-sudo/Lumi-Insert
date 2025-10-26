import { PrismaClient } from '@prisma/client';

const pool = new PrismaClient();

export type PoolType = typeof pool;
export default pool;
