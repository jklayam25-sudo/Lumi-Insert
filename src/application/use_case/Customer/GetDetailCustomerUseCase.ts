import { CustomerDependencies } from '../../../Infrastructures/type/dependenciesType';
import CustomerRepository from '../../../model/customers/CustomerRepository';
import { CustomerDetailResponse } from '../../../model/customers/type/customerType';

export default class GetDetailCustomerUseCase {
  private _customerRepository: CustomerRepository;

  constructor({ customerRepository }: CustomerDependencies) {
    this._customerRepository = customerRepository;
  }
  // type came from params, params should be / or /suspended
  async execute(useCaseParams: string): Promise<CustomerDetailResponse> {
    return this._customerRepository.getDetailCustomerById(useCaseParams);
  }
}
