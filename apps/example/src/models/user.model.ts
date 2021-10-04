import { AggregateRoot } from '@nestjs/cqrs';
import { RegisterUserRequest } from '../commands/register-user/register-user.request';
import { UserInvitedToVerify } from '../events/user-invited-to-verify.event';
import { UserRegistered } from '../events/user-registered.event';
import { UserVerifiedRegistration } from '../events/user-verified-registration.event';
import { BaseEvent } from './base-event.model';

export interface IUser {
  id: string;
  name: string;
  emailAddress: string;
  verificationPending?: boolean;
}

export class User extends AggregateRoot<BaseEvent> implements IUser {
  id!: string;
  name!: string;
  emailAddress!: string;
  verificationPending = false;

  /** Mutation methods (AKA "actions creators") */

  register(id: string, { name, emailAddress }: RegisterUserRequest): void {
    this.apply(new UserRegistered(id, { name, emailAddress }));
  }

  inviteToVerify(): void {
    this.apply(new UserInvitedToVerify(this.id, {}));
  }

  verifyRegistration(): void {
    this.apply(new UserVerifiedRegistration(this.id, {}));
  }

  /** Event handlers (AKA "reducers") */

  protected onUserRegistered(event: UserRegistered): void {
    this.id = event.aggregateId;
    this.name = event.data.name;
    this.emailAddress = event.data.emailAddress;
  }

  protected onUserInvitedToVerify(_event: UserInvitedToVerify): void {
    this.verificationPending = true;
  }

  protected onUserVerifiedRegistration(_event: UserVerifiedRegistration): void {
    this.verificationPending = false;
  }
}
