import UserLogin from '../../../model/users/entities/UserLogin';
import UserToken from '../../../model/authentications/entities/UserToken';
import TokenRepository from '../../../model/authentications/TokenRepository';
import UserRepository from '../../../model/users/UserRepository';
import PasswordHash from '../../security/PasswordHash';
import TokenManager from '../../security/TokenManager';
import { UserLoginPayload } from '../../../model/users/type/userType';
import { LoginUserUseCaseDependencies } from '../../../Infrastructures/type/dependenciesType';

export default class LoginUserUseCase {
  private _userRepository: UserRepository;
  private _authenticationRepository: TokenRepository;
  private _authenticationTokenManager: TokenManager;
  private _passwordHash: PasswordHash;

  constructor({
    userRepository,
    passwordHash,
    authenticationTokenManager,
    authenticationRepository,
  }: LoginUserUseCaseDependencies) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload: UserLoginPayload) {
    const loginUser = new UserLogin(useCasePayload);
    const { password, id, role } = await this._userRepository.getCredentialsByUsername(
      loginUser.username
    );
    await this._passwordHash.comparePassword(loginUser.password, password);
    const userInfo = {
      username: loginUser.username,
      id,
      role,
    };

    const userToken = new UserToken({
      accessToken: await this._authenticationTokenManager.createAccessToken(userInfo),
      refreshToken: await this._authenticationTokenManager.createRefreshToken(userInfo),
    });

    await this._authenticationRepository.removeToken(userInfo.id);
    await this._authenticationRepository.addToken(userToken.refreshToken, userInfo.id);
    return userToken;
  }
}
