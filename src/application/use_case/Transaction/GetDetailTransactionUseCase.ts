import { TransactionDependencies } from '../../../Infrastructures/type/dependenciesType';
import TransactionRepository from '../../../model/transactions/TransactionRepository';
import { DetailTransaction } from '../../../model/transactions/type/TransactionType';

export default class GetDetailTransactionUseCase {
  private _transactionRepository: TransactionRepository;

  constructor({ transactionRepository }: TransactionDependencies) {
    this._transactionRepository = transactionRepository;
  }

  async execute(UseCaseParams: string): Promise<DetailTransaction> {
    const registeredTransaction =
      await this._transactionRepository.getTransactionById(UseCaseParams);

    return registeredTransaction;
  }
}
