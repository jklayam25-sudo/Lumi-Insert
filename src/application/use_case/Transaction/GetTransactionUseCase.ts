import { TransactionDependencies } from '../../../Infrastructures/type/dependenciesType';
import TransactionRepository from '../../../model/transactions/TransactionRepository';
import { TransactionRegisteredPayload } from '../../../model/transactions/type/TransactionType';

export default class GetTransactionUseCase {
  private _transactionRepository: TransactionRepository;

  constructor({ transactionRepository }: TransactionDependencies) {
    this._transactionRepository = transactionRepository;
  }

  async execute(): Promise<TransactionRegisteredPayload[]> {
    const registeredTransaction = await this._transactionRepository.getAllTransaction();

    return registeredTransaction;
  }
}
