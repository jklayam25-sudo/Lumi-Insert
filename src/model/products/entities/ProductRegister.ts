import InvariantError from '../../../Commons/errorHandling/InvariantError';
import { ProductRegisterPayload } from '../type/productType';

export default class ProductRegister {
  product_id: string;
  product_name: string;
  product_quantity: number;
  product_price: number;
  constructor(payload: ProductRegisterPayload) {
    this._verifyPayload(payload);

    this.product_id = payload.product_id;
    this.product_name = payload.product_name;
    this.product_quantity = payload.product_quantity;
    this.product_price = payload.product_price;
  }

  _verifyPayload({
    product_id,
    product_name,
    product_quantity,
    product_price,
  }: ProductRegisterPayload) {
    if (!product_id || !product_name || !product_quantity || !product_price) {
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
