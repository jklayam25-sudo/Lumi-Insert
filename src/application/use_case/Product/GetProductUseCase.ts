import { ProductDependencies } from '../../../Infrastructures/type/dependenciesType';
import ProductRepository from '../../../model/products/ProductRepository';
import { ProductRegisterPayload } from '../../../model/products/type/productType';

export default class GetProductUseCase {
  private _productRepository: ProductRepository;

  constructor({ productRepository }: ProductDependencies) {
    this._productRepository = productRepository;
  }

  async execute(): Promise<ProductRegisterPayload[]> {
    const registeredProduct = await this._productRepository.getAllProduct();

    return registeredProduct;
  }
}
