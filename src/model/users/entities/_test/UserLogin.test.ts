/* eslint-disable @typescript-eslint/no-explicit-any */
import UserLogin from '../UserLogin';
import { describe, it, expect } from 'bun:test';

describe('UserLogin entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    const payload = {
      username: 'dicoding',
    } as any;

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      username: 'dicoding',
      password: 12345,
    } as any;

    expect(() => new UserLogin(payload)).toThrowError(
      'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create UserLogin entities correctly', () => {
    const payload = {
      username: 'dicoding',
      password: '12345',
    } as any;

    const userLogin = new UserLogin(payload);

    expect(userLogin).toBeInstanceOf(UserLogin);
    expect(userLogin.username).toEqual(payload.username);
    expect(userLogin.password).toEqual(payload.password);
  });
});
