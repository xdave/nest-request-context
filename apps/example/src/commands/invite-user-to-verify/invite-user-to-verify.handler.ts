import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RequestContext } from '../../models/request-context.model';
import { IUserRepository } from '../../repository/user-repository.interface';
import { InviteUserToVerify } from './invite-user-to-verify.command';

@CommandHandler(InviteUserToVerify)
export class InviteUserToVerifyHandler
  implements ICommandHandler<InviteUserToVerify>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly ctx: RequestContext,
  ) {}

  async execute(command: InviteUserToVerify): Promise<void> {
    const user = await this.userRepository.findOneById(command.userId);
    user.inviteToVerify();

    // Delayed a bit to demonstrate that the context is retained outside
    // of the HTTP request cycle.
    setTimeout(async () => {
      await this.userRepository.save(user);
      console.log('InviteUserToVerifyHandler', this.ctx.toJSON());
    }, 1500);
  }
}
