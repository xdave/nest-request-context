import { Injectable } from '@nestjs/common';
import { IEvent, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { InviteUserToVerify } from '../commands/invite-user-to-verify/invite-user-to-verify.command';
import { SendVerifyEmail } from '../commands/send-verify-email/send-verify-email.command';
import { UserInvitedToVerify } from '../events/user-invited-to-verify.event';
import { UserRegistered } from '../events/user-registered.event';

@Injectable()
export class UserSagas {
  @Saga()
  inviteUsersToVerifyUponRegistration = (event$: Observable<IEvent>) =>
    event$.pipe(
      ofType(UserRegistered),
      map((event) => new InviteUserToVerify(event.aggregateId)),
    );

  @Saga()
  sendVerificationEmail = (event$: Observable<IEvent>) =>
    event$.pipe(
      ofType(UserInvitedToVerify),
      map((event) => new SendVerifyEmail(event.aggregateId)),
    );
}
