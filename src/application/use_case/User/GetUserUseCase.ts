import { UserDependencies } from '../../../Infrastructures/type/dependenciesType';
import UserRepository from '../../../model/users/UserRepository';

export default class GetUserUseCase {
  private _userRepository: UserRepository;

  constructor({ userRepository }: UserDependencies) {
    this._userRepository = userRepository;
  }

  async execute() {
    return this._userRepository.getAllUser();
  }
}
