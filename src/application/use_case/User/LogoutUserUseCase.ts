import { LogoutUserUseCaseDependencies } from '../../../Infrastructures/type/dependenciesType';
import TokenRepository from '../../../model/authentications/TokenRepository';
import TokenManager from '../../security/TokenManager';

export default class LogoutUserUseCase {
  private _authenticationRepository: TokenRepository;
  private _authenticationTokenManager: TokenManager;

  constructor({
    authenticationTokenManager,
    authenticationRepository,
  }: LogoutUserUseCaseDependencies) {
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCaseCookies: string) {
    const userInfo = await this._authenticationTokenManager.verifyRefreshToken(useCaseCookies);

    await this._authenticationRepository.removeToken(userInfo.id);

    return true;
  }
}
