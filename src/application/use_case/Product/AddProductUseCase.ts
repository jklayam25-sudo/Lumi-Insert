import { ProductDependencies } from '../../../Infrastructures/type/dependenciesType';
import ProductRegister from '../../../model/products/entities/ProductRegister';
import ProductRepository from '../../../model/products/ProductRepository';
import { ProductRegisterPayload } from '../../../model/products/type/productType';

export default class AddProductUseCase {
  private _productRepository: ProductRepository;

  constructor({ productRepository }: ProductDependencies) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload: ProductRegisterPayload): Promise<ProductRegisterPayload> {
    const registerProduct = new ProductRegister(useCasePayload);

    await this._productRepository.duplicateChecker(
      registerProduct.product_id,
      registerProduct.product_name
    );

    const registeredProduct = await this._productRepository.addProduct(registerProduct);

    return registeredProduct;
  }
}
