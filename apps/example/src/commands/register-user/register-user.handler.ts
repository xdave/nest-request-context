import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 } from 'uuid';
import { RequestContext } from '../../models/request-context.model';
import { User } from '../../models/user.model';
import { IUserRepository } from '../../repository/user-repository.interface';
import { RegisterUser } from './register-user.command';
import { RegisterUserResponse } from './register-user.response';

@CommandHandler(RegisterUser)
export class RegisterUserHandler implements ICommandHandler<RegisterUser> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly ctx: RequestContext,
  ) {}

  async execute(command: RegisterUser): Promise<RegisterUserResponse> {
    const user = new User();
    user.register(v4(), command.request);
    await this.userRepository.save(user);

    console.log('RegisterUserHandler', this.ctx.toJSON());

    return new RegisterUserResponse({ userId: user.id });
  }
}
