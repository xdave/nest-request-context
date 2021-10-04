import { InMemoryUserRepository } from './user-repository.in-memory';
import { IUserRepository } from './user-repository.interface';

export const UserRepositoryProvider = {
  provide: IUserRepository,
  useClass: InMemoryUserRepository,
};
