import { TransactionItemProductDependencies } from '../../../Infrastructures/type/dependenciesType';
import TransactionRepository from '../../../model/transactions/TransactionRepository';
import ItemRepository from '../../../model/transitems/ItemRepository';
import {
  ItemRevisionProductPayload,
  ItemRevisionResponse,
  ItemRevisionTrxItemPayload,
} from '../../../model/transitems/type/ItemType';

export default class DeleteItemTransactionUseCase {
  private _transactionRepository: TransactionRepository;
  private _itemRepository: ItemRepository;

  constructor({ transactionRepository, itemRepository }: TransactionItemProductDependencies) {
    this._transactionRepository = transactionRepository;
    this._itemRepository = itemRepository;
  }

  async execute(useCaseTrxId: string, useCaseRefId: string): Promise<ItemRevisionResponse> {
    await this._transactionRepository.isTransactionValid(useCaseTrxId);

    const pastQuantities = await this._itemRepository.getQuantity(useCaseRefId);
    const { product_id, product_price } =
      await this._itemRepository.getProductIdPrice(useCaseRefId);

    const productPayload: ItemRevisionProductPayload = {
      product_id,
      product_price,
      added_quantity: pastQuantities,
    };
    const trxItemPayload: ItemRevisionTrxItemPayload = {
      refTransaction_id: useCaseRefId,
      revise_quantity: 0,
    };

    return this._itemRepository.deleteItem(useCaseTrxId, productPayload, trxItemPayload);
  }
}
