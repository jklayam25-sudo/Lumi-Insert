import { TransactionDependencies } from '../../../Infrastructures/type/dependenciesType';
import TransactionRepository from '../../../model/transactions/TransactionRepository';
import { GetTransactionResponse } from '../../../model/transactions/type/TransactionType';

export default class GetTransactionUseCase {
  private _transactionRepository: TransactionRepository;

  constructor({ transactionRepository }: TransactionDependencies) {
    this._transactionRepository = transactionRepository;
  }

  async execute(id: string | undefined, limit: number): Promise<GetTransactionResponse> {
    const registeredTransaction = await this._transactionRepository.getAllTransaction(id, limit);
    const totalRows = await this._transactionRepository.getTotalRows();

    const toResponse = {
      transaction_data: registeredTransaction,
      total_rows: totalRows
    };

    return toResponse;
  }
}
