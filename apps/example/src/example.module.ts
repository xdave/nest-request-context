import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NestRequestContextModule } from '@xdave/nest-request-context';
import { UserCommandHandlers } from './commands';
import { requestContext } from './context/request-context.storage';
import { ExampleController } from './example.controller';
import { RequestContextGuardProvider } from './guards/request-context-guard.provider';
import { RequestContext } from './models/request-context.model';
import { UserQueryHandlers } from './queries';
import { UserRepositoryProvider } from './repository/user-repository.provider';
import { UserHistoryProjectionSagas } from './sagas/user-history-projection.sagas';
import { UserSagas } from './sagas/user.sagas';

const handlers = [...UserCommandHandlers, ...UserQueryHandlers];
const sagas = [UserSagas, UserHistoryProjectionSagas];
const repositories = [UserRepositoryProvider];

@Module({
  imports: [
    NestRequestContextModule.forRoot({
      contexts: [
        { contextClass: RequestContext, asyncContext: requestContext },
      ],
    }),
    CqrsModule,
  ],
  controllers: [ExampleController],
  providers: [
    /**
     * This should be the first global guard, that way it can setup the context
     * even for other guards that use, for example, PassportJS, et al.
     */
    RequestContextGuardProvider,
    ...handlers,
    ...sagas,
    ...repositories,
  ],
})
export class ExampleModule {}
