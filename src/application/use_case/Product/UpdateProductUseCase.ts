import { ProductDependencies } from '../../../Infrastructures/type/dependenciesType';
import ProductRegister from '../../../model/products/entities/ProductRegister';
import ProductRepository from '../../../model/products/ProductRepository';
import { ProductRegisterPayload } from '../../../model/products/type/productType';

export default class UpdateProductUseCase {
  private _productRepository: ProductRepository;

  constructor({ productRepository }: ProductDependencies) {
    this._productRepository = productRepository;
  }

  async execute(
    useCaseParams: string,
    useCasePayload: ProductRegisterPayload
  ): Promise<ProductRegisterPayload> {
    const registerProduct = new ProductRegister(useCasePayload);
    await this._productRepository.getProductById(useCaseParams);

    if(useCaseParams !== registerProduct.product_id){
      await this._productRepository.duplicateChecker(
        registerProduct.product_id,
        registerProduct.product_name
      );
    } else {
      await this._productRepository.duplicateChecker(
        'RANDOM',
        registerProduct.product_name
      );
    }
    

    const { product_id, product_name, product_price, product_quantity } =
      await this._productRepository.updateProduct(useCaseParams, registerProduct);

    return { product_id, product_name, product_price, product_quantity };
  }
}
