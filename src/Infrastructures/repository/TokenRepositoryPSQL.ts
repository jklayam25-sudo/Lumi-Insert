import InternalError from '../../Commons/errorHandling/InternalError';
import InvariantError from '../../Commons/errorHandling/InvariantError';
import TokenRepository from '../../model/authentications/TokenRepository';
import { PoolType } from '../database/pool';

class TokenRepositoryPSQL extends TokenRepository {
  private pool: PoolType;
  constructor(pool: PoolType) {
    super();
    this.pool = pool;
  }

  async addToken(tokens: string, id: string) {
    try {
      await this.pool.authToken.create({
        data: {
          token: tokens,
          ownerId: id,
          expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        throw new InternalError('addToken at TokenRepoPSQL:', error.message);
    }
  }

  async getToken(id: string) {
    try {
      const token = await this.pool.authToken.findFirst({
        where: {
          ownerId: id,
        },
        select: {
          token: true,
        },
      });
      return token;
    } catch (error: unknown) {
      if (error instanceof Error) throw new InvariantError('Token not found');
    }
  }

  async removeToken(id: string) {
    try {
      await this.getToken(id);

      await this.pool.authToken.deleteMany({
        where: {
          ownerId: id,
        },
      });
    } catch (error: unknown) {
      if (error instanceof InvariantError) {
        return;
      }
      throw new InternalError('removeToken at TokenRepoPSQL:', '');
    }
  }
}

export default TokenRepositoryPSQL;
