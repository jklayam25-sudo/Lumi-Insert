import { UserTokenPayload } from '../type/authType';

export default class UserToken {
  accessToken: string;
  refreshToken: string;
  constructor(payload: UserTokenPayload) {
    this._verifyPayload(payload);

    this.accessToken = payload.accessToken;
    this.refreshToken = payload.refreshToken;
  }

  _verifyPayload({ accessToken, refreshToken }: UserTokenPayload) {
    if (!accessToken || !refreshToken) {
      throw new Error('TOKEN_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
