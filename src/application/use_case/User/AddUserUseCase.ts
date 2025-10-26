import { AddUserDependencies } from '../../../Infrastructures/type/dependenciesType';
import UserRegister from '../../../model/users/entities/UserRegister';
import { UserRegisterPayload } from '../../../model/users/type/userType';
import UserRepository from '../../../model/users/UserRepository';
import PasswordHash from '../../security/PasswordHash';

export default class AddUserUseCase {
  private _userRepository: UserRepository;
  private _passwordHash: PasswordHash;

  constructor({ userRepository, passwordHash }: AddUserDependencies) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload: UserRegisterPayload) {
    const registerUser = new UserRegister(useCasePayload);

    await this._userRepository.verifyAvailableUsername(registerUser.username);

    const hashedPassword = await this._passwordHash.hash(registerUser.password);
    const registeredUser = {
      ...registerUser,
      password: hashedPassword,
    };
    await this._userRepository.addUser(registeredUser);

    return 'Success Registering User';
  }
}
