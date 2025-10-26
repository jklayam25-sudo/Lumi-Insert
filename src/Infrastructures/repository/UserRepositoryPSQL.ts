import AuthenticationError from '../../Commons/errorHandling/AuthenticationError';
import InternalError from '../../Commons/errorHandling/InternalError';
import InvariantError from '../../Commons/errorHandling/InvariantError';
import {} from '../../model/users/entities/UserRegister';
import UserRepository from '../../model/users/UserRepository';
import { PoolType } from '../../Infrastructures/database/pool';
import {} from '../../model/users/entities/UserUpdate';
import {
  UserCredentials,
  UserRegisterPayload,
  UserUpdatePayload,
} from '../../model/users/type/userType';

class UserRepositoryPSQL extends UserRepository {
  private pool: PoolType;
  constructor(pool: PoolType) {
    super();
    this.pool = pool;
  }

  async verifyAvailableUsername(username: string): Promise<void> {
    const isAvailable = await this.pool.user.findUnique({
      where: {
        username: username,
      },
    });
    if (isAvailable) throw new InvariantError('Username is not available');
  }

  async verifyUserId(userId: string): Promise<void> {
    const isAvailable = await this.pool.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!isAvailable) throw new InvariantError('UserId is not valid!');
  }

  async addUser(UserRegister: UserRegisterPayload) {
    const id = `user-${Bun.randomUUIDv7()}`;
    const queryPayload = {
      id,
      ...UserRegister,
    };

    try {
      await this.pool.user.create({
        data: queryPayload,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        throw new InternalError('AddUser at UserRepoPSQL:', error.message);
    }
  }

  async updateUser(UserId: string, UserUpdate: UserUpdatePayload) {
    try {
      await this.pool.user.update({
        where: {
          id: UserId,
        },
        data: UserUpdate,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        throw new InternalError('updateUser at UserRepoPSQL:', error.message);
    }
  }
  // function for "SOFT" delete user.
  async deleteUser(UserId: string) {
    try {
      await this.pool.user.update({
        where: {
          id: UserId,
        },
        data: {
          isActive: false,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        throw new InternalError('updateUser at UserRepoPSQL:', error.message);
    }
  }

  async getCredentialsByUsername(username: string): Promise<UserCredentials> {
    try {
      const result = await this.pool.user.findUnique({
        where: {
          username: username,
        },
        select: {
          password: true,
          id: true,
          role: true,
        },
      });

      if (!result) {
        throw new AuthenticationError('Credentials wrong!');
      }

      return result;
    } catch (error: unknown) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      throw new InternalError('getPasswordByUsername at UserRepoPSQL:', '');
    }
  }

  async getIdByUsername(username: string): Promise<string> {
    try {
      console.log(username);
      const result = await this.pool.user.findUnique({
        where: {
          username: username,
        },
        select: {
          id: true,
        },
      });

      if (!result) {
        throw new AuthenticationError('Credentials wrong!');
      }

      return result.id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalError('getIdByUsername at UserRepoPSQL:', error.message);
      }
      throw new InternalError('getIdByUsername at UserRepoPSQL:', '');
    }
  }

  async getUserById(userId: string) {
    try {
      const result = await this.pool.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          fullname: true,
          role: true,
        },
      });

      if (!result) {
        throw new AuthenticationError('Credentials wrong!');
      }

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalError('getUserById at UserRepoPSQL:', error.message);
      }
      throw new InternalError('getUserById at UserRepoPSQL:', '');
    }
  }

  async getAllUser() {
    try {
      const result = await this.pool.user.findMany({
        where: {
          isActive: true,
        },
        select: {
          id: true,
          username: true,
          fullname: true,
          role: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalError('getAllUser at UserRepoPSQL:', error.message);
      }
      throw new InternalError('getAllUser at UserRepoPSQL:', '');
    }
  }
}

export default UserRepositoryPSQL;
