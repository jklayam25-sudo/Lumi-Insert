import { ProductDependencies } from '../../../Infrastructures/type/dependenciesType';
import ProductRepository from '../../../model/products/ProductRepository';
import { GetProductResponse } from '../../../model/products/type/productType';

export default class GetProductUseCase {
  private _productRepository: ProductRepository;

  constructor({ productRepository }: ProductDependencies) {
    this._productRepository = productRepository;
  }

  async execute(id: string | undefined, limit: number): Promise<GetProductResponse> {
    const registeredProduct = await this._productRepository.getAllProduct(id, limit);
    const productRows = await this._productRepository.getProductRows();
    const response = {
      product_data: registeredProduct,
      total_rows: productRows
    };
    return response;
  }
}
