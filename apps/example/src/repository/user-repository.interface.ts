import { IUserHistoryProjection } from '../interfaces/user-history-projection.interface';
import { BaseEvent } from '../models/base-event.model';
import { User } from '../models/user.model';

export abstract class IUserRepository {
  abstract findOneById(userId: string): Promise<User>;
  abstract save(user: User): Promise<void>;

  abstract getHistoryById(userId: string): Promise<IUserHistoryProjection>;
  abstract saveUserHistoryProjection(event: BaseEvent): Promise<void>;
}
