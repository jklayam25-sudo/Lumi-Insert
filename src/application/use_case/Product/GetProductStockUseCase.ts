import { ProductDependencies } from '../../../Infrastructures/type/dependenciesType';
import ProductRepository from '../../../model/products/ProductRepository';
import { ProductStockResponse } from '../../../model/products/type/productType';

export default class GetProductStockUseCase {
  private _productRepository: ProductRepository;

  constructor({ productRepository }: ProductDependencies) {
    this._productRepository = productRepository;
  }

  async execute(UseCaseParams: string): Promise<ProductStockResponse> {
    const productStock = await this._productRepository.getProductStock(UseCaseParams);

    return productStock;
  }
}
