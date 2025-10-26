import InvariantError from '../../../Commons/errorHandling/InvariantError';
import { CustomerUpdatePayload } from '../type/customerType';
import { validatePayload } from '../../../Commons/helperFunction/UpdatePayload';

export default class CustomerUpdate {
  customer_name?: string;
  customer_contact?: string;
  customer_address?: string;
  customer_status?: 'ACTIVE' | 'SUSPENDED';
  customer_lat?: number;
  customer_lng?: number;

  constructor(payload: CustomerUpdatePayload) {
    this._verifyPayload(payload);

    this.customer_name = payload.customer_name;
    this.customer_contact = payload.customer_contact;
    this.customer_address = payload.customer_address;
    this.customer_status = payload.customer_status;
    this.customer_lat = payload.customer_lat;
    this.customer_lng = payload.customer_lng;
  }

  _verifyPayload(payload: CustomerUpdatePayload) {
    const {
      customer_name,
      customer_contact,
      customer_address,
      customer_status,
      customer_lat,
      customer_lng,
    } = payload;

    const isEmpty = Object.values(payload).every((value) => value === undefined || value === null);

    if (isEmpty) {
      throw new InvariantError('Bad Request: Request Update should be atleast 1.');
    }

    validatePayload('customer_name', customer_name, 'string');
    validatePayload('customer_contact', customer_contact, 'string');
    validatePayload('customer_address', customer_address, 'string');
    validatePayload('customer_status', customer_status, 'string');
    validatePayload('customer_lat', customer_lat, 'number');
    validatePayload('customer_lng', customer_lng, 'number');
  }
}
