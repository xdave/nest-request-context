import { BaseEvent } from '../models/base-event.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserInvitedToVerify {}

export class UserInvitedToVerify extends BaseEvent<IUserInvitedToVerify> {}
