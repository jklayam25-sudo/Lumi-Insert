import { TransactionItemProductDependencies } from '../../../Infrastructures/type/dependenciesType';
import ProductRepository from '../../../model/products/ProductRepository';
import TransactionRepository from '../../../model/transactions/TransactionRepository';
import ItemRegister from '../../../model/transitems/entities/ItemRegister';
import ItemRepository from '../../../model/transitems/ItemRepository';
import { ItemRegisterFinal, ItemRegisterPayload } from '../../../model/transitems/type/ItemType';

export default class AddItemTransactionUseCase {
  private _transactionRepository: TransactionRepository;
  private _itemRepository: ItemRepository;
  private _productRepository: ProductRepository;

  constructor({
    transactionRepository,
    itemRepository,
    productRepository,
  }: TransactionItemProductDependencies) {
    this._transactionRepository = transactionRepository;
    this._itemRepository = itemRepository;
    this._productRepository = productRepository;
  }

  async execute(
    useCaseParams: string,
    useCasePayload: ItemRegisterPayload[]
  ): Promise<ItemRegisterFinal[]> {
    await this._transactionRepository.isTransactionValid(useCaseParams);

    const registerItems = new ItemRegister(useCasePayload);

    await this._productRepository.checkStockAvailability(registerItems);

    const registeredItems = await this._itemRepository.addItemsTrx(useCaseParams, registerItems);

    return registeredItems;
  }
}
