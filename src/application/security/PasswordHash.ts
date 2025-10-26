/* eslint-disable @typescript-eslint/no-unused-vars */
export default class PasswordHash {
  async hash(password: string): Promise<string> {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }

  async comparePassword(plain: string, encrypted: string) {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }
}
