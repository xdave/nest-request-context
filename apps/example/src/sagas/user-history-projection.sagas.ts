import { Injectable } from '@nestjs/common';
import { IEvent, ofType, Saga } from '@nestjs/cqrs';
import { concatMap, Observable } from 'rxjs';
import { UserInvitedToVerify } from '../events/user-invited-to-verify.event';
import { UserRegistered } from '../events/user-registered.event';
import { UserVerifiedRegistration } from '../events/user-verified-registration.event';
import { BaseEvent } from '../models/base-event.model';
import { IUserRepository } from '../repository/user-repository.interface';

@Injectable()
export class UserHistoryProjectionSagas {
  constructor(private readonly userRepository: IUserRepository) {}

  @Saga()
  projectEvent = (event$: Observable<IEvent>) =>
    event$.pipe(
      ofType(UserRegistered, UserInvitedToVerify, UserVerifiedRegistration),
      concatMap((event: BaseEvent) =>
        this.userRepository.saveUserHistoryProjection(event),
      ),
    );
}
