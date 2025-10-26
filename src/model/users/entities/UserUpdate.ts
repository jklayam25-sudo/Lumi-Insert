import InvariantError from '../../../Commons/errorHandling/InvariantError';
import { UserUpdatePayload } from '../type/userType';

export default class UserUpdate {
  fullname: string;
  role: 'ADMIN' | 'OWNER';

  constructor(payload: UserUpdatePayload) {
    this._verifyPayload(payload);

    this.fullname = payload.fullname;
    this.role = payload.role;
  }

  _verifyPayload(payload: UserUpdatePayload) {
    const { fullname, role } = payload;

    if (!fullname || !role) {
      throw new InvariantError('USER_UPDATE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof fullname !== 'string' || typeof fullname !== 'string') {
      throw new InvariantError('USER_UPDATE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (role !== 'ADMIN' && role !== 'OWNER') {
      throw new InvariantError('USER_ROLE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
