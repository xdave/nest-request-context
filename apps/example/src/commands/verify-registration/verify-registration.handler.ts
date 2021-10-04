import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../../repository/user-repository.interface';
import { VerifyRegistration } from './verify-registration.command';

@CommandHandler(VerifyRegistration)
export class VerifyRegistrationHandler
  implements ICommandHandler<VerifyRegistration>
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ request }: VerifyRegistration): Promise<void> {
    const user = await this.userRepository.findOneById(request.userId);
    user.verifyRegistration();
    await this.userRepository.save(user);
    console.log(`User "${user.id}" verified.`);
  }
}
