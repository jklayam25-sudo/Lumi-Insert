import { CustomerDependencies } from '../../../Infrastructures/type/dependenciesType';
import CustomerRepository from '../../../model/customers/CustomerRepository';
import CustomerRegister from '../../../model/customers/entities/CustomerRegister';
import {
  CustomerRegisterPayload,
  CustomerRegisterResponse,
} from '../../../model/customers/type/customerType';

export default class AddCustomerUseCase {
  private _customerRepository: CustomerRepository;

  constructor({ customerRepository }: CustomerDependencies) {
    this._customerRepository = customerRepository;
  }

  async execute(useCasePayload: CustomerRegisterPayload): Promise<CustomerRegisterResponse> {
    const registerCust = new CustomerRegister(useCasePayload);

    const registeredCust = await this._customerRepository.addCustomer(registerCust);
    return registeredCust;
  }
}
