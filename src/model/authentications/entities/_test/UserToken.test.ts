/* eslint-disable @typescript-eslint/no-explicit-any */
import UserToken from '../UserToken';
import { describe, it, expect } from 'bun:test';

describe('a RegisterToken entities', () => {
  it('should throw eUserrror when payload did not contain needed property', () => {
    const payload = {
      accessToken: 'abc',
    } as any;

    expect(() => new UserToken(payload)).toThrowError('TOKEN_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should create RegisterToken object correctly', () => {
    // Arrange
    const payload = {
      accessToken: 'accessToken123',
      refreshToken: 'refreshTokenxxzz',
    } as any;

    // Action
    const { accessToken, refreshToken } = new UserToken(payload);

    // Assert
    expect(accessToken).toEqual(payload.accessToken);
    expect(refreshToken).toEqual(payload.refreshToken);
  });
});
