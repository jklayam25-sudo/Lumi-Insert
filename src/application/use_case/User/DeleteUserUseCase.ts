import { UserDependencies } from '../../../Infrastructures/type/dependenciesType';
import UserRepository from '../../../model/users/UserRepository';

export default class DeleteUserUseCase {
  private _userRepository: UserRepository;

  constructor({ userRepository }: UserDependencies) {
    this._userRepository = userRepository;
  }

  async execute(useCaseParams: string) {
    await this._userRepository.getUserById(useCaseParams);
    await this._userRepository.deleteUser(useCaseParams);
    return 'Success Deleting User';
  }
}
