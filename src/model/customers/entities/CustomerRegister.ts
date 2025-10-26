import InvariantError from '../../../Commons/errorHandling/InvariantError';
import { CustomerRegisterPayload } from '../type/customerType';

export default class CustomerRegister {
  customer_name: string;
  customer_contact: string;
  customer_address: string;
  constructor(payload: CustomerRegisterPayload) {
    this._verifyPayload(payload);

    this.customer_name = payload.customer_name;
    this.customer_contact = payload.customer_contact;
    this.customer_address = payload.customer_address;
  }

  _verifyPayload({ customer_name, customer_contact, customer_address }: CustomerRegisterPayload) {
    if (!customer_name || !customer_contact || !customer_address) {
      throw new InvariantError('Bad Request: Payload are not complete!');
    }

    if (
      typeof customer_name !== 'string' ||
      typeof customer_contact !== 'string' ||
      typeof customer_address !== 'string'
    ) {
      throw new InvariantError('Bad Request: Payload does not meet requirement type!');
    }
  }
}
