/* eslint-disable @typescript-eslint/no-explicit-any */
import TokenRepository from '../TokenRepository';
import { describe, it, expect } from 'bun:test';

describe('TokenRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const tokenRepository = new TokenRepository();

    await expect(tokenRepository.addToken({} as any)).rejects.toThrowError(
      'TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
