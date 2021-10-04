import { BaseEvent } from '../models/base-event.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserVerifiedRegistration {}

export class UserVerifiedRegistration extends BaseEvent<IUserVerifiedRegistration> {}
