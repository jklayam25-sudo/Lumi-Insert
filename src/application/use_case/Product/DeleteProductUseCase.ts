import { ProductDependencies } from '../../../Infrastructures/type/dependenciesType';
import ProductRepository from '../../../model/products/ProductRepository';

export default class DeleteProductUseCase {
  private _productRepository: ProductRepository;

  constructor({ productRepository }: ProductDependencies) {
    this._productRepository = productRepository;
  }

  async execute(useCaseParams: string): Promise<string> {
    await this._productRepository.getProductById(useCaseParams);
    await this._productRepository.deleteProduct(useCaseParams);

    return 'Success Deleting Product';
  }
}
