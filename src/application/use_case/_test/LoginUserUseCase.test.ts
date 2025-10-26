import { describe, it, expect, jest } from 'bun:test';
import UserRepository from '../../../model/users/UserRepository';
import PasswordHash from '../../security/PasswordHash';
import UserToken from '../../../model/authentications/entities/UserToken';
import TokenManager from '../../security/TokenManager';
import TokenRepository from '../../../model/authentications/TokenRepository';
import LoginUserUseCase from '../User/LoginUserUseCase';

describe('GetAuthenticationUseCase', () => {
  it('should orchestrating the get authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
    };

    const mockedAuthentication = new UserToken({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    });

    const mockUserRepository = new UserRepository();
    const mockAuthenticationRepository = new TokenRepository();
    const mockAuthenticationTokenManager = new TokenManager();
    const mockPasswordHash = new PasswordHash();

    // Mocking
    mockUserRepository.getCredentialsByUsername = jest.fn().mockImplementation(() =>
      Promise.resolve({
        password: 'encrypted_password',
        id: 'user-123',
        role: 'ADMIN',
      })
    );
    mockPasswordHash.comparePassword = jest.fn().mockImplementation(() => Promise.resolve());

    mockAuthenticationTokenManager.createAccessToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockedAuthentication.accessToken));
    mockAuthenticationTokenManager.createRefreshToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockedAuthentication.refreshToken));
    mockAuthenticationRepository.removeToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationRepository.addToken = jest.fn().mockImplementation(() => Promise.resolve());

    // create use case instance
    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });

    // Action
    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    // Assert
    expect(actualAuthentication).toEqual(
      new UserToken({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      })
    );

    expect(mockUserRepository.getCredentialsByUsername).toBeCalledWith('dicoding');
    expect(mockPasswordHash.comparePassword).toBeCalledWith('secret', 'encrypted_password');
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({
      username: 'dicoding',
      id: 'user-123',
      role: 'ADMIN',
    });
    expect(mockAuthenticationTokenManager.createRefreshToken).toBeCalledWith({
      username: 'dicoding',
      id: 'user-123',
      role: 'ADMIN',
    });
    expect(mockAuthenticationRepository.addToken).toBeCalledWith(
      mockedAuthentication.refreshToken,
      'user-123'
    );
  });
});
