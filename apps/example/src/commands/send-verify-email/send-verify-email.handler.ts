import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../../repository/user-repository.interface';
import { SendVerifyEmail } from './send-verify-email.command';

@CommandHandler(SendVerifyEmail)
export class SendVerifyEmailHandler
  implements ICommandHandler<SendVerifyEmail>
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(command: SendVerifyEmail): Promise<void> {
    const user = await this.userRepository.findOneById(command.userId);
    if (user.verificationPending) {
      console.log(`Sending verification link email to`, user.emailAddress);
    }
  }
}
