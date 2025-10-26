import { sign, verify } from 'hono/jwt';
import TokenManager from '../../application/security/TokenManager';
import { SignatureKey } from 'hono/utils/jwt/jws';
import { authJWTPayload } from '../../model/authentications/type/authType';
import { AccountInfo } from '../../model/users/type/userType';

class TokenManagerJWT extends TokenManager {
  async createAccessToken(payload: AccountInfo): Promise<string> {
    const newPayload = {
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      unique: Bun.randomUUIDv7(),
    };
    return await sign(newPayload, 'Ev3trfwaGEAT34Rsa32' as SignatureKey);
  }

  async createRefreshToken(payload: AccountInfo): Promise<string> {
    const newPayload = {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };
    return await sign(newPayload, 'Ev3trfwaGEAT34Rsa32' as SignatureKey);
  }

  async verifyAccessToken(token: string): Promise<authJWTPayload> {
    return (await verify(token, 'Ev3trfwaGEAT34Rsa32' as SignatureKey)) as authJWTPayload;
  }

  async verifyRefreshToken(token: string): Promise<authJWTPayload> {
    return (await verify(token, 'Ev3trfwaGEAT34Rsa32' as SignatureKey)) as authJWTPayload;
  }
}

export default TokenManagerJWT;
