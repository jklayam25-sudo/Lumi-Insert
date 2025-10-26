import InvariantError from '../../../Commons/errorHandling/InvariantError';
import { TransactionItemProductDependencies } from '../../../Infrastructures/type/dependenciesType';
import ProductRepository from '../../../model/products/ProductRepository';
import TransactionRepository from '../../../model/transactions/TransactionRepository';
import ItemRepository from '../../../model/transitems/ItemRepository';
import {
  ItemRevisionProductPayload,
  ItemRevisionResponse,
  ItemRevisionTrxItemPayload,
} from '../../../model/transitems/type/ItemType';

export default class EditItemTransactionUseCase {
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
    useCaseTrxId: string,
    useCaseRefId: string,
    useCaseRevise: number
  ): Promise<ItemRevisionResponse> {
    await this._transactionRepository.isTransactionValid(useCaseTrxId);

    const { product_id, product_price } =
      await this._itemRepository.getProductIdPrice(useCaseRefId);
    const pastQuantities = await this._itemRepository.getQuantity(useCaseRefId);
    const { product_quantity } = await this._productRepository.getProductById(product_id);
    const differenceQuantity = pastQuantities - useCaseRevise;

    const productPayload: ItemRevisionProductPayload = {
      product_id,
      product_price,
      added_quantity: differenceQuantity,
    };

    const trxItemPayload: ItemRevisionTrxItemPayload = {
      refTransaction_id: useCaseRefId,
      revise_quantity: useCaseRevise,
    };

    if (differenceQuantity > 0) {
      return this._itemRepository.editItemQuantity(useCaseTrxId, productPayload, trxItemPayload);
    }
    // Decrement shouldd check stock first !
    if (product_quantity < Math.abs(differenceQuantity))
      throw new InvariantError('Stock is unavailable!');

    return this._itemRepository.editItemQuantity(useCaseTrxId, productPayload, trxItemPayload);
  }
}
