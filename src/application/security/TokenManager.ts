import { authJWTPayload } from '../../model/authentications/type/authType';
import { AccountInfo } from '../../model/users/type/userType';

/* eslint-disable @typescript-eslint/no-unused-vars */

export default class TokenManager {
  async createAccessToken(payload: AccountInfo): Promise<string> {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async createRefreshToken(payload: AccountInfo): Promise<string> {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAccessToken(token: string): Promise<authJWTPayload> {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async verifyRefreshToken(token: string): Promise<authJWTPayload> {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }
}
