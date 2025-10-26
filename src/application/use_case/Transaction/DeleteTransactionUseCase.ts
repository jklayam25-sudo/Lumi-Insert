import { TransactionItemProductDependencies } from '../../../Infrastructures/type/dependenciesType';
import ProductRepository from '../../../model/products/ProductRepository';
import TransactionRepository from '../../../model/transactions/TransactionRepository';
import { TransactionRegisteredPayload } from '../../../model/transactions/type/TransactionType';
import ItemRepository from '../../../model/transitems/ItemRepository';

export default class DeleteTransactionUseCase {
  private _transactionRepository: TransactionRepository;
  private _productRepository: ProductRepository;
  private _itemRepository: ItemRepository;

  constructor({
    transactionRepository,
    productRepository,
    itemRepository,
  }: TransactionItemProductDependencies) {
    this._transactionRepository = transactionRepository;
    this._productRepository = productRepository;
    this._itemRepository = itemRepository;
  }

  async execute(UseCaseParams: string): Promise<TransactionRegisteredPayload> {
    await this._transactionRepository.isTransactionValid(UseCaseParams);

    const transaction_items = await this._itemRepository.getItemsByTrxId(UseCaseParams);

    if (transaction_items.length > 0) {
      await this._productRepository.BulkAddProductQuantity(transaction_items);
    }

    const registeredTransaction =
      await this._transactionRepository.deleteTransaction(UseCaseParams);

    return registeredTransaction;
  }
}
