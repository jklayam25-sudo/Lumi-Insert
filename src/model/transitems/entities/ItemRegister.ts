import InvariantError from '../../../Commons/errorHandling/InvariantError';
import { ItemRegisterPayload } from '../type/ItemType';

export default class ItemRegister extends Array {
  constructor(payload: ItemRegisterPayload[]) {
    super();
    for (const item of payload) {
      this._verifyPayload(item);
      this.push(item);
    }
  }

  _verifyPayload({
    product_id,
    product_quantity,
    product_name,
    product_price,
  }: ItemRegisterPayload) {
    if (!product_id || !product_quantity || !product_name || !product_price) {
      throw new InvariantError('Request Body did not meet data specifications!');
    }

    if (
      typeof product_id !== 'string' ||
      typeof product_name !== 'string' ||
      typeof product_quantity !== 'number' ||
      typeof product_price !== 'number'
    ) {
      throw new InvariantError('Request Body did not meet data type!');
    }
  }
}
