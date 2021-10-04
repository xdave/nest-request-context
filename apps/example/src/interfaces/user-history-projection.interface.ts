import { BaseEvent } from '../models/base-event.model';
import { IUser } from '../models/user.model';

export interface IUserHistoryProjection {
  user?: IUser;
  history: BaseEvent[];
}
