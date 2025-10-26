import { JWTPayload } from 'hono/utils/jwt/types';

export interface authJWTPayload extends JWTPayload {
  username: string;
  id: string;
  role: 'ADMIN' | 'OWNER';
}

export type UserTokenPayload = {
  accessToken: string;
  refreshToken: string;
};
