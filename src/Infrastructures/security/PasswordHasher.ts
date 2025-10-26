import PasswordHash from '../../application/security/PasswordHash';
import AuthenticationError from '../../Commons/errorHandling/AuthenticationError';

class PasswordHasher extends PasswordHash {
  async hash(password: string): Promise<string> {
    return await Bun.password.hash(password, {
      algorithm: 'bcrypt',
      cost: 10,
    });
  }

  async comparePassword(plain: string, encrypted: string) {
    const isSame = await Bun.password.verify(plain, encrypted);
    if (!isSame) throw new AuthenticationError('Wrong Credentials, try again!');
  }
}

export default PasswordHasher;
