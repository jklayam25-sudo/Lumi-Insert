import { CustomerDependencies } from '../../../Infrastructures/type/dependenciesType';
import CustomerRepository from '../../../model/customers/CustomerRepository';
import CustomerUpdate from '../../../model/customers/entities/CustomerUpdate';
import {
  CustomerRegisterResponse,
  CustomerUpdatePayload,
} from '../../../model/customers/type/customerType';

export default class UpdateCustomerUseCase {
  private _customerRepository: CustomerRepository;

  constructor({ customerRepository }: CustomerDependencies) {
    this._customerRepository = customerRepository;
  }

  async execute(
    useCaseParams: string,
    useCasePayload: CustomerUpdatePayload
  ): Promise<CustomerRegisterResponse> {
    const updateCustomer = new CustomerUpdate(useCasePayload);

    const updatedCustomer = await this._customerRepository.updateCustomer(
      useCaseParams,
      updateCustomer
    );
    return updatedCustomer;
  }
}
