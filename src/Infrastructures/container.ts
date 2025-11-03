import AddProductUseCase from '../application/use_case/Product/AddProductUseCase';
import DeleteProductUseCase from '../application/use_case/Product/DeleteProductUseCase';
import UpdateProductUseCase from '../application/use_case/Product/UpdateProductUseCase';
import AddUserUseCase from '../application/use_case/User/AddUserUseCase';
import DeleteUserUseCase from '../application/use_case/User/DeleteUserUseCase';
import GetUserUseCase from '../application/use_case/User/GetUserUseCase';
import LoginUserUseCase from '../application/use_case/User/LoginUserUseCase';
import LogoutUserUseCase from '../application/use_case/User/LogoutUserUseCase';
import UpdateUserUseCase from '../application/use_case/User/UpdateUserUseCase';
import { SuperAdminAuth } from '../middleware/superAdminAuth';
import pool from './database/pool';
import ProductRepositoryPSQL from './repository/ProductRepositoryPSQL';
import TokenRepositoryPSQL from './repository/TokenRepositoryPSQL';
import UserRepositoryPSQL from './repository/UserRepositoryPSQL';
import PasswordHasher from './security/PasswordHasher';
import TokenManagerJWT from './security/TokenManagerJWT';
import GetProductUseCase from '../application/use_case/Product/GetProductUseCase';
import GetProductByParamsUseCase from '../application/use_case/Product/GetProductByParamUseCase';
import { SuperLimitter } from '../middleware/searchLimitter';
import AddTransactionUseCase from '../application/use_case/Transaction/AddTransactionUseCase';
import TransactionRepositoryPSQL from './repository/TransactionRepositoryPSQL';
import { AdminAuth } from '../middleware/adminAuth';
import GetTransactionUseCase from '../application/use_case/Transaction/GetTransactionUseCase';
import GetDetailTransactionUseCase from '../application/use_case/Transaction/GetDetailTransactionUseCase';
import DeleteTransactionUseCase from '../application/use_case/Transaction/DeleteTransactionUseCase';
import ItemRepositoryPSQL from './repository/ItemRepositoryPSQL';
import AddItemTransactionUseCase from '../application/use_case/Transaction/AddItemTransactionUseCase';
import DeleteItemTransactionUseCase from '../application/use_case/Transaction/DeleteItemTransactionUseCase';
import EditItemTransactionUseCase from '../application/use_case/Transaction/EditItemTransactionUseCase';
import AddCustomerUseCase from '../application/use_case/Customer/AddCustomerUseCase';
import CustomerRepositoryPSQL from './repository/CustomerRepositoryPSQL';
import UpdateCustomerUseCase from '../application/use_case/Customer/UpdateCustomerUseCase';
import GetCustomerUseCase from '../application/use_case/Customer/GetCustomerUseCase';
import GetCustomerNameUseCase from '../application/use_case/Customer/GetCustomerNameUseCase';
import GetProductStockUseCase from '../application/use_case/Product/GetProductStockUseCase';
import GetDetailCustomerUseCase from '../application/use_case/Customer/GetDetailCustomerUseCase';

const userRepository = new UserRepositoryPSQL(pool);
const passwordHash = new PasswordHasher();

const authenticationTokenManager = new TokenManagerJWT();
const authenticationRepository = new TokenRepositoryPSQL(pool);

const productRepository = new ProductRepositoryPSQL(pool);

const transactionRepository = new TransactionRepositoryPSQL(pool);

const itemRepository = new ItemRepositoryPSQL(pool);

const customerRepository = new CustomerRepositoryPSQL(pool);
export const container = {
  addUserUseCase: new AddUserUseCase({ userRepository, passwordHash }),
  loginUserUseCase: new LoginUserUseCase({
    userRepository,
    passwordHash,
    authenticationTokenManager,
    authenticationRepository,
  }),
  logoutUserUseCase: new LogoutUserUseCase({
    authenticationTokenManager,
    authenticationRepository,
  }),
  updateUserUseCase: new UpdateUserUseCase({ userRepository }),
  getUserUseCase: new GetUserUseCase({ userRepository }),
  superAdminAuth: SuperAdminAuth(), //Middleware used to check cookies credential role is owner or throw.
  deleteUserUseCase: new DeleteUserUseCase({ userRepository }),

  addProductUseCase: new AddProductUseCase({ productRepository }),
  getProductUseCase: new GetProductUseCase({ productRepository }),
  getProductByParamsUseCase: new GetProductByParamsUseCase({ productRepository }),
  updateProductUseCase: new UpdateProductUseCase({ productRepository }),
  deleteProductUseCase: new DeleteProductUseCase({ productRepository }),
  searchLimiter: await SuperLimitter(), //Middleware used to limitting request by the cookies
  getProductStockUseCase: new GetProductStockUseCase({ productRepository }),

  addTransactionUseCase: new AddTransactionUseCase({ transactionRepository }),
  adminAuth: AdminAuth({ authenticationTokenManager }),
  getTransactionUseCase: new GetTransactionUseCase({ transactionRepository }),
  getDetailTransactionUseCase: new GetDetailTransactionUseCase({ transactionRepository }),
  deleteTransactionUseCase: new DeleteTransactionUseCase({
    transactionRepository,
    productRepository,
    itemRepository,
  }),

  addItemTransactionUseCase: new AddItemTransactionUseCase({
    transactionRepository,
    productRepository,
    itemRepository,
  }),
  editItemTransactionUseCase: new EditItemTransactionUseCase({
    transactionRepository,
    productRepository,
    itemRepository,
  }),
  deleteItemTransactionUseCase: new DeleteItemTransactionUseCase({
    transactionRepository,
    productRepository,
    itemRepository,
  }),

  addCustomerUseCase: new AddCustomerUseCase({ customerRepository }),
  updateCustomerUseCase: new UpdateCustomerUseCase({ customerRepository }),
  getCustomerUseCase: new GetCustomerUseCase({ customerRepository }),
  getCustomerNameUseCase: new GetCustomerNameUseCase({ customerRepository }),
  getDetailCustomerUseCase: new GetDetailCustomerUseCase({ customerRepository }),
};

export type containerPayload = typeof container;
