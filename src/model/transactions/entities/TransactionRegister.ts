import InvariantError from '../../../Commons/errorHandling/InvariantError';
import { TransactionRegisterPayload } from '../type/TransactionType';

export default class TransactionRegister {
  transaction_customer_name: string;
  transaction_handler: string;
  constructor(payload: TransactionRegisterPayload) {
    this._verifyPayload(payload);

    this.transaction_customer_name = payload.transaction_customer_name;
    this.transaction_handler = payload.transaction_handler;
  }

  _verifyPayload({ transaction_customer_name, transaction_handler }: TransactionRegisterPayload) {
    if (!transaction_customer_name || !transaction_handler) {
      throw new InvariantError('Request Body did not meet data specifications!');
    }

    if (typeof transaction_customer_name !== 'string' || typeof transaction_handler !== 'string') {
      throw new InvariantError('Request Body did not meet data type!');
    }
  }
}
