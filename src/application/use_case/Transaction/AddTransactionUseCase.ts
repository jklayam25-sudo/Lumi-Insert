import { TransactionDependencies } from '../../../Infrastructures/type/dependenciesType';
import TransactionRegister from '../../../model/transactions/entities/TransactionRegister';
import TransactionRepository from '../../../model/transactions/TransactionRepository';
import { TransactionRegisterPayload } from '../../../model/transactions/type/TransactionType';

export default class AddTransactionUseCase {
  private _transactionRepository: TransactionRepository;

  constructor({ transactionRepository }: TransactionDependencies) {
    this._transactionRepository = transactionRepository;
  }

  async execute(useCasePayload: TransactionRegisterPayload): Promise<string> {
    const registerTransaction = new TransactionRegister(useCasePayload);

    const registeredTransaction =
      await this._transactionRepository.addTransaction(registerTransaction);

    return registeredTransaction;
  }
}
