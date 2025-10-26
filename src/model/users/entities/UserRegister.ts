import InvariantError from '../../../Commons/errorHandling/InvariantError';
import { UserRegisterPayload } from '../type/userType';

export default class UserRegister {
  username: string;
  password: string;
  fullname: string;
  constructor(payload: UserRegisterPayload) {
    this._verifyPayload(payload);

    this.username = payload.username;
    this.password = payload.password;
    this.fullname = payload.fullname;
  }

  _verifyPayload({ username, password, fullname }: UserRegisterPayload) {
    if (!username || !password || !fullname) {
      throw new InvariantError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      typeof fullname !== 'string'
    ) {
      throw new InvariantError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (username.length > 50) {
      throw new InvariantError('REGISTER_USER.USERNAME_LIMIT_CHAR');
    }

    if (!username.match(/^[\w]+$/)) {
      throw new InvariantError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }
  }
}
