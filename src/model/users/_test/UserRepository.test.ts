/* eslint-disable @typescript-eslint/no-explicit-any */
import UserRepository from '../UserRepository';
import { describe, it, expect } from 'bun:test';

describe('UserRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const userRepository = new UserRepository();

    await expect(userRepository.addUser({} as any)).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.verifyAvailableUsername('')).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.getCredentialsByUsername('')).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.getIdByUsername('')).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
