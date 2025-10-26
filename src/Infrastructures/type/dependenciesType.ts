import PasswordHash from '../../application/security/PasswordHash';
import TokenManager from '../../application/security/TokenManager';
import TokenRepository from '../../model/authentications/TokenRepository';
import CustomerRepository from '../../model/customers/CustomerRepository';
import ProductRepository from '../../model/products/ProductRepository';
import TransactionRepository from '../../model/transactions/TransactionRepository';
import ItemRepository from '../../model/transitems/ItemRepository';
import UserRepository from '../../model/users/UserRepository';
import { PoolType } from '../database/pool';

export type AddUserDependencies = {
  userRepository: UserRepository;
  passwordHash: PasswordHash;
};

export type UserDependencies = {
  userRepository: UserRepository;
};

export type LoginUserUseCaseDependencies = {
  userRepository: UserRepository;
  passwordHash: PasswordHash;
  authenticationRepository: TokenRepository;
  authenticationTokenManager: TokenManager;
};

export type LogoutUserUseCaseDependencies = {
  authenticationRepository: TokenRepository;
  authenticationTokenManager: TokenManager;
};

// Dependecies type for Product >

export type ProductDependencies = {
  productRepository: ProductRepository;
};

export type TransactionDependencies = {
  transactionRepository: TransactionRepository;
};

export type TransactionProductDependencies = {
  transactionRepository: TransactionRepository;
  productRepository: ProductRepository;
};

export type TransactionItemProductDependencies = {
  transactionRepository: TransactionRepository;
  itemRepository: ItemRepository;
  productRepository: ProductRepository;
};

export type TransactionItemProductPoolDependencies = {
  transactionRepository: TransactionRepository;
  itemRepository: ItemRepository;
  productRepository: ProductRepository;
  Pool: PoolType;
};

export type CustomerDependencies = {
  customerRepository: CustomerRepository;
};
