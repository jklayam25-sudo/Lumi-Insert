/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'bun:test';
import TokenManager from '../TokenManager';

describe('Token Manager Helper interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const tokenManager = new TokenManager();

    // Action & Assert
    await expect(tokenManager.createAccessToken({} as any)).rejects.toThrowError(
      'TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
    );
    await expect(tokenManager.createRefreshToken({} as any)).rejects.toThrowError(
      'TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
    );
  });
});
