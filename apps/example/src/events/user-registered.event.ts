import { BaseEvent } from '../models/base-event.model';

export interface IUserRegistered {
  name: string;
  emailAddress: string;
}

export class UserRegistered extends BaseEvent<IUserRegistered> {}
