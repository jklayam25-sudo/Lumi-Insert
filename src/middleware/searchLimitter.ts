/* eslint-disable @typescript-eslint/no-unused-vars */

import { rateLimiter } from 'hono-rate-limiter';
import { getCookie } from 'hono/cookie';

export const SuperLimitter = async () => {
  return rateLimiter({
    windowMs: 1 * 60 * 1000,
    limit: 1,
    standardHeaders: 'draft-6',
    keyGenerator: (c) => {
      console.log('Cookie kita:', getCookie(c, 'LUMIALBCORS'));
      return getCookie(c, 'LUMIALBCORS') ?? 'anonim';
    },
  });
};
