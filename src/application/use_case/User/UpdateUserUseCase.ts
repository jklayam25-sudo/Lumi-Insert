import { UserDependencies } from '../../../Infrastructures/type/dependenciesType';
import UserUpdate from '../../../model/users/entities/UserUpdate';
import { UserUpdatePayload } from '../../../model/users/type/userType';
import UserRepository from '../../../model/users/UserRepository';

export default class UpdateUserUseCase {
  private _userRepository: UserRepository;

  constructor({ userRepository }: UserDependencies) {
    this._userRepository = userRepository;
  }

  async execute(useCaseParams: string, useCasePayload: UserUpdatePayload) {
    const updateUser = new UserUpdate(useCasePayload);
    await this._userRepository.verifyUserId(useCaseParams);
    await this._userRepository.updateUser(useCaseParams, updateUser);
    return 'Success Updating User';
  }
}
